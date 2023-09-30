import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useFirebaseAuth } from '@hooks/index';
import {
  isAuthProcessingState,
  isCongAccountCreateState,
  isEmailAuthState,
  isEmailBlockedState,
  isOnlineState,
  isShowTermsUseState,
  isUserMfaSetupState,
  isUserMfaVerifyState,
  isUserSignInState,
  isUserSignUpState,
  offlineOverrideState,
  visitorIDState,
} from '@states/app';
import {
  displaySnackNotification,
  setCongAccountConnected,
  setCurrentMFAStage,
  setIsAppLoad,
  setIsAuthProcessing,
  setIsCongAccountCreate,
  setIsSetup,
  setIsUnauthorizedRole,
  setIsUserSignIn,
  setIsUserSignUp,
  setOfflineOverride,
  setRootModalOpen,
  setUserMfaSetup,
  setUserMfaVerify,
} from '@services/recoil/app';
import { congNameState, congRoleState } from '@states/settings';
import { CPE_ROLES } from '@constants/index';
import { loadApp, runUpdater, updateUserInfoAfterLogin } from '@services/cpe';
import { apiSendAuthorization } from '@services/api/user';
import { handleUpdateSetting } from '@services/dexie/settings';
import { apiFetchSchedule } from '@services/api/schedule';
import { handleUpdateScheduleFromRemote } from '@services/cpe/schedules';

const useStartup = () => {
  const { isAuthenticated } = useFirebaseAuth();

  const showTermsUse = useRecoilValue(isShowTermsUseState);
  const isEmailBlocked = useRecoilValue(isEmailBlockedState);
  const isEmailAuth = useRecoilValue(isEmailAuthState);
  const isOnline = useRecoilValue(isOnlineState);
  const visitorID = useRecoilValue(visitorIDState);
  const isUserSignUp = useRecoilValue(isUserSignUpState);
  const isUserSignIn = useRecoilValue(isUserSignInState);
  const isUserMfaVerify = useRecoilValue(isUserMfaVerifyState);
  const isUserMfaSetup = useRecoilValue(isUserMfaSetupState);
  const isCongAccountCreate = useRecoilValue(isCongAccountCreateState);
  const isAuthProcessing = useRecoilValue(isAuthProcessingState);
  const isOfflineOverride = useRecoilValue(offlineOverrideState);
  const cong_name = useRecoilValue(congNameState);
  const cong_role = useRecoilValue(congRoleState);

  useEffect(() => {
    if (showTermsUse) return;

    const showSignup = () => {
      setIsUserSignUp(true);
      setIsUserSignIn(false);
      setIsCongAccountCreate(false);
      setUserMfaVerify(false);
      setUserMfaSetup(false);
    };

    const runNotAuthenticatedStep = async () => {
      if (isOfflineOverride) {
        showSignup();
        return;
      }

      if (cong_name.length === 0) {
        showSignup();
        return;
      }

      const approvedRole = cong_role.some((role) => CPE_ROLES.includes(role));

      if (!approvedRole) {
        showSignup();
        return;
      }

      if (cong_name.length > 0) {
        setIsSetup(false);
        await loadApp();
        await runUpdater();
        setTimeout(() => {
          setIsSetup(false);
          setIsAppLoad(false);
        }, [1000]);
      }
    };

    if (!isAuthenticated) runNotAuthenticatedStep();
  }, [isAuthenticated, isOfflineOverride, isOnline, showTermsUse, cong_name, cong_role]);

  useEffect(() => {
    if (showTermsUse) return;
    if (visitorID.toString().length === 0) return;

    const runAuthenticatedStep = async () => {
      try {
        setIsUserSignIn(false);
        setIsAuthProcessing(true);

        const approvedRole = cong_role.some((role) => CPE_ROLES.includes(role));

        if (!isOfflineOverride && cong_name.length > 0 && approvedRole) {
          setIsSetup(false);
          await loadApp();
          await runUpdater();
          setTimeout(() => {
            setIsSetup(false);
            setIsAppLoad(false);
          }, [1000]);
          return;
        }

        setIsAuthProcessing(true);

        const { status, data } = await apiSendAuthorization();

        if (status !== 200) {
          await displaySnackNotification({
            message: data.message,
            severity: 'warning',
          });

          setIsAuthProcessing(false);
          return;
        }

        const result = {};
        const { cong_name, cong_role, mfa } = data;

        if (mfa === 'not_enabled') {
          if (cong_name.length === 0) {
            result.createCongregation = true;
          }

          if (cong_name.length > 0 && cong_role.length === 0) {
            result.unauthorized = true;
          }

          if (cong_name.length > 0 && cong_role.length > 0) {
            const approvedRole = cong_role.some((role) => CPE_ROLES.includes(role));

            if (!approvedRole) {
              result.unauthorized = true;
            }

            if (approvedRole) {
              await updateUserInfoAfterLogin(data);

              result.success = true;
            }
          }
        } else {
          result.isVerifyMFA = true;
        }

        if (result.isVerifyMFA || result.success || result.createCongregation) {
          await handleUpdateSetting({ account_type: 'vip' });

          if (result.isVerifyMFA) {
            setCurrentMFAStage('verify');
            setIsUserSignUp(false);
            setUserMfaVerify(true);
            setIsCongAccountCreate(false);
            setIsUnauthorizedRole(false);
          }

          if (result.success) {
            setIsSetup(false);

            await runUpdater();

            await setRootModalOpen(true);
            const { status: scheduleStatus, data: scheduleData } = await apiFetchSchedule();
            if (scheduleStatus === 200) {
              await handleUpdateScheduleFromRemote(scheduleData);
            }
            await setRootModalOpen(false);

            setTimeout(() => {
              setOfflineOverride(false);
              setCongAccountConnected(true);
              setIsAppLoad(false);
            }, [2000]);
          }

          if (result.createCongregation) {
            setIsUserSignUp(false);
            setIsUserSignIn(false);
            setIsCongAccountCreate(true);
          }
        }

        if (result.unauthorized) {
          setIsUserSignUp(false);
          setUserMfaVerify(true);
          setIsCongAccountCreate(false);
          setIsUnauthorizedRole(true);
        }

        setIsAuthProcessing(false);
      } catch (err) {
        await displaySnackNotification({
          message: err.message,
          severity: 'error',
        });

        setIsAuthProcessing(false);
      }
    };

    if (isAuthenticated && visitorID !== '') runAuthenticatedStep();
  }, [isAuthenticated, isOfflineOverride, showTermsUse, visitorID]);

  return {
    showTermsUse,
    isEmailBlocked,
    isEmailAuth,
    isUserSignUp,
    isUserSignIn,
    isUserMfaVerify,
    isUserMfaSetup,
    isCongAccountCreate,
    isAuthProcessing,
  };
};

export default useStartup;
