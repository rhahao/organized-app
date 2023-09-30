import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { visitorIDState } from '@states/app';
import { setAuthPersistence, userSignInCustomToken } from '@services/firebase/auth';
import { apiUpdatePasswordlessInfo } from '@services/api/user';
import {
  displaySnackNotification,
  setCongAccountConnected,
  setCurrentMFAStage,
  setIsAppLoad,
  setIsCongAccountCreate,
  setIsEmailAuth,
  setIsEmailLinkAuthenticate,
  setIsSetup,
  setIsUnauthorizedRole,
  setOfflineOverride,
  setRootModalOpen,
} from '@services/recoil/app';
import { CPE_ROLES } from '@constants/index';
import { loadApp, runUpdater, updateUserInfoAfterLogin } from '@services/cpe';
import { apiFetchSchedule } from '@services/api/schedule';
import { handleUpdateScheduleFromRemote } from '@services/cpe/schedules';

const useEmailLinkAuth = () => {
  const cancel = useRef();

  const visitorID = useRecoilValue(visitorIDState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get('code');

  const handleRequestNewLink = () => {
    setSearchParams('');
  };

  const completeEmailAuth = async () => {
    try {
      setIsProcessing(true);

      await setAuthPersistence();

      const user = await userSignInCustomToken(code);

      const { status, data } = await apiUpdatePasswordlessInfo(user.uid);
      localStorage.removeItem('emailForSignIn');

      if (status !== 200) {
        await displaySnackNotification({
          message: data.message,
          severity: 'warning',
        });

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

            // refetch auth after email update
            await userSignInCustomToken(code);

            result.success = true;
          }
        }
      } else {
        result.isVerifyMFA = true;
      }

      if (result.success) {
        setSearchParams('');
        setOfflineOverride(true);

        setIsSetup(false);
        setIsEmailLinkAuthenticate(false);

        await loadApp();
        await runUpdater();

        await setRootModalOpen(true);
        const { status: scheduleStatus, data: scheduleData } = await apiFetchSchedule();
        if (scheduleStatus === 200) {
          await handleUpdateScheduleFromRemote(scheduleData);
        }
        await setRootModalOpen(false);

        setTimeout(() => {
          setCongAccountConnected(true);
          setIsAppLoad(false);
        }, [2000]);
      }

      if (result.isVerifyMFA) {
        setSearchParams('');
        setIsEmailLinkAuthenticate(false);
        setIsEmailAuth(false);
        setCurrentMFAStage('verify');
      }

      if (result.unauthorized) {
        setSearchParams('');
        setIsEmailLinkAuthenticate(false);
        setIsEmailAuth(false);
        setIsUnauthorizedRole(true);
      }

      if (result.createCongregation) {
        setSearchParams('');
        setIsEmailLinkAuthenticate(false);
        setIsEmailAuth(false);
        setIsCongAccountCreate(true);
      }

      setIsProcessing(false);
    } catch (err) {
      await displaySnackNotification({
        message: err.message,
        severity: 'error',
      });

      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  return { handleRequestNewLink, completeEmailAuth, isProcessing, visitorID };
};

export default useEmailLinkAuth;
