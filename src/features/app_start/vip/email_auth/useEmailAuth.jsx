import { useEffect, useRef, useState } from 'react';
import { displaySnackNotification, setIsEmailAuth, setIsUserSignIn, setIsUserSignUp } from '@services/recoil/app';
import { isEmailValid } from '@services/validator';
import { useAppTranslation } from '@hooks';
import { apiRequestPasswordlesssLink } from '@services/api/user';

const useEmailAuth = () => {
  const cancel = useRef();

  const { t } = useAppTranslation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [userTmpEmail, setUserTmpEmail] = useState('');

  const handleProviderSignIn = () => {
    setIsUserSignUp(false);
    setIsUserSignIn(true);
    setIsEmailAuth(false);
  };

  const handleSendLink = async () => {
    cancel.current = false;

    if (!isEmailValid(userTmpEmail)) {
      await displaySnackNotification({
        message: t('emailNotSupported'),
        severity: 'warning',
      });

      return;
    }

    setIsProcessing(true);

    const { status, data } = await apiRequestPasswordlesssLink(userTmpEmail);

    if (status !== 200) {
      await displaySnackNotification({
        message: data.message,
        severity: 'warning',
      });

      return;
    }

    localStorage.setItem('emailForSignIn', userTmpEmail);
    await displaySnackNotification({
      message: t('emailAuthSent'),
      severity: 'error',
    });

    setIsProcessing(false);
  };

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  return { isProcessing, setUserTmpEmail, handleProviderSignIn, handleSendLink, userTmpEmail };
};

export default useEmailAuth;
