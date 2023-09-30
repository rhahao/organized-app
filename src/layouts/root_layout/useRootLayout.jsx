import { useRecoilState, useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import usePwa2 from 'use-pwa2';
import { isAppLoadState, isEmailLinkAuthenticateState } from '@states/app';
import { useEffect } from 'react';

const useRootLayout = () => {
  const { enabledInstall, installPwa, isLoading } = usePwa2();

  const [searchParams] = useSearchParams();

  const [isEmailAuth, setIsEmailAuth] = useRecoilState(isEmailLinkAuthenticateState);

  const isAppLoad = useRecoilValue(isAppLoadState);

  useEffect(() => {
    const value = searchParams.get('code') !== null;
    setIsEmailAuth(value);
  }, [setIsEmailAuth, searchParams]);

  return { enabledInstall, installPwa, isLoading, isAppLoad, isEmailAuth };
};

export default useRootLayout;
