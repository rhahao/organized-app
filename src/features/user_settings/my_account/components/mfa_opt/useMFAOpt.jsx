import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useMediaQuery, useTheme } from '@mui/material';
import { apiHandleVerifyOTP } from '@services/api/user';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { visitorIDState } from '@states/app';

let isValidateRan = false;

const useMFAOpt = ({ setOpen }) => {
  const cancel = useRef();

  const queryClient = useQueryClient();

  const visitorID = useRecoilValue(visitorIDState);

  const [tabValue, setTabValue] = useState(0);
  const [isNoQR, setIsNoQR] = useState(false);
  const [userOTP, setUserOTP] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }
    setOpen(false);
  };

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleCopyClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const handleOtpChange = async (newValue) => {
    isValidateRan = false;
    setUserOTP(newValue);
  };

  const handleVerifyOTP = useCallback(async () => {
    try {
      isValidateRan = true;
      setIsProcessing(true);
      cancel.current = false;

      const { status, data } = await apiHandleVerifyOTP(userOTP, true);

      if (status !== 200) {
        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });

        setIsProcessing(false);
        return;
      }

      if (!cancel.current) {
        queryClient.invalidateQueries({ queryKey: ['2fa'] });
        setOpen(false);
        setIsProcessing(false);
      }
    } catch (err) {
      if (!cancel.current) {
        setIsProcessing(false);
      }
    }
  }, [userOTP, setOpen, queryClient]);

  useEffect(() => {
    if (userOTP.length === 6) {
      if (!isValidateRan) handleVerifyOTP();
    }
  }, [handleVerifyOTP, userOTP]);

  useEffect(() => {
    const handlePaste = (e) => {
      const text = (e.clipboardData || window.clipboardData).getData('text');
      setUserOTP(text);
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  return {
    tabValue,
    isNoQR,
    setIsNoQR,
    userOTP,
    isProcessing,
    fullScreen,
    handleClose,
    handleTabChange,
    handleCopyClipboard,
    handleOtpChange,
    handleVerifyOTP,
    visitorID,
  };
};

export default useMFAOpt;
