import { useRecoilState, useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import usePwa2 from 'use-pwa2';
import { isAboutOpenState, isAppLoadState, isEmailLinkAuthenticateState } from '@states/app';
import { useEffect } from 'react';
import { useUserAutoLogin } from '@hooks/index';

const useRootLayout = () => {
  const { enabledInstall, installPwa, isLoading } = usePwa2();

  const { autoLoginStatus } = useUserAutoLogin();

  const [searchParams] = useSearchParams();

  const [isEmailAuth, setIsEmailAuth] = useRecoilState(isEmailLinkAuthenticateState);

  const isAppLoad = useRecoilValue(isAppLoadState);
  const isOpenAbout = useRecoilValue(isAboutOpenState);

  useEffect(() => {
    const value = searchParams.get('code') !== null;
    setIsEmailAuth(value);
  }, [setIsEmailAuth, searchParams]);

  return { enabledInstall, installPwa, isLoading, isAppLoad, isEmailAuth, isOpenAbout, autoLoginStatus };
};

export default useRootLayout;
