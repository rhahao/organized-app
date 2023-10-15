import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import QRCode from 'qrcode';
import { apiGetUser2FA } from '@services/api/user';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { userIDState } from '@states/app';

const useMFASetup = () => {
  const cancel = useRef();

  const userID = useRecoilValue(userIDState);

  const { isLoading, error, data } = useQuery({
    queryKey: ['2fa'],
    queryFn: apiGetUser2FA,
    enabled: userID.length > 0,
  });

  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [openOptIn, setOpenOptIn] = useState(false);
  const [otpAuth, setOtpAuth] = useState('');

  const handleCopyClipboard = useCallback(async (text) => {
    await navigator.clipboard.writeText(text);
  }, []);

  const handleClose = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const handleOptInMFA = () => {
    setOpenOptIn(true);
  };

  useEffect(() => {
    const modelState = async () => {
      await setRootModalOpen(isLoading);
    };

    modelState();
  }, [isLoading]);

  useEffect(() => {
    const getImg = async () => {
      const qrImg = await QRCode.toDataURL(data.data.qrCode);

      setQrCode(qrImg);
      setToken(data.data.secret);
      setOtpAuth(data.data.qrCode);
    };

    if (data && data.data.qrCode) {
      getImg();
    }
  }, [data]);

  useEffect(() => {
    const displayError = async () => {
      await displaySnackNotification({
        message: getMessageByCode(error),
        severity: 'error',
      });
    };

    if (error) {
      displayError();
    }
  }, [error]);

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, [cancel]);

  return {
    qrCode,
    token,
    viewerOpen,
    openOptIn,
    handleCopyClipboard,
    handleClose,
    handleOptInMFA,
    setOpenOptIn,
    data: data?.data,
    setViewerOpen,
    otpAuth,
  };
};

export default useMFASetup;
