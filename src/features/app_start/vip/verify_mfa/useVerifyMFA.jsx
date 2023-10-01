import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { visitorIDState } from '@states/app';
import { apiHandleVerifyOTP } from '@services/api/user';
import {
  displaySnackNotification,
  setCongAccountConnected,
  setIsAppLoad,
  setIsCongAccountCreate,
  setIsSetup,
  setIsUnauthorizedRole,
  setOfflineOverride,
  setRootModalOpen,
  setUserMfaVerify,
} from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { runUpdater, updateUserInfoAfterLogin } from '@services/cpe';
import { CPE_ROLES } from '@constants/index';
import { apiFetchSchedule } from '@services/api/schedule';
import { handleUpdateScheduleFromRemote } from '@services/cpe/schedules';
import { matchIsNumeric } from '@utils/common';

const useVerifyMFA = () => {
  const cancel = useRef();
  const trustDevice = useRef();

  const [isProcessing, setIsProcessing] = useState(false);
  const [userOTP, setUserOTP] = useState('');

  const visitorID = useRecoilValue(visitorIDState);

  const handleOtpChange = async (newValue) => {
    setUserOTP(newValue);
  };

  const handleVerifyOTP = useCallback(async () => {
    try {
      setIsProcessing(true);
      cancel.current = false;

      const { status, data } = await apiHandleVerifyOTP(userOTP, trustDevice.current.checked);

      if (status !== 200) {
        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });

        setIsProcessing(false);
        return;
      }

      const result = {};
      const { cong_name, cong_role } = data;

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

      if (!cancel.current) {
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

        if (result.unauthorized) {
          setUserMfaVerify(false);
          setIsUnauthorizedRole(true);
        }

        if (result.createCongregation) {
          setUserMfaVerify(false);
          setIsCongAccountCreate(true);
        }

        setIsProcessing(false);
      }
    } catch (err) {
      if (!cancel.current) {
        setIsProcessing(false);
        await displaySnackNotification({
          message: err.message,
          severity: 'error',
        });
      }
    }
  }, [userOTP]);

  useEffect(() => {
    if (userOTP.length === 6) {
      handleVerifyOTP();
    }
  }, [handleVerifyOTP, userOTP]);

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  return { isProcessing, visitorID, handleOtpChange, userOTP, matchIsNumeric, trustDevice, handleVerifyOTP };
};

export default useVerifyMFA;
