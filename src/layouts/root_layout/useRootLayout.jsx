import usePwa2 from 'use-pwa2';

const useRootLayout = () => {
  const { enabledInstall, installPwa, isLoading } = usePwa2();

  return { enabledInstall, installPwa, isLoading };
};

export default useRootLayout;
