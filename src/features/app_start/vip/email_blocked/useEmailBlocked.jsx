import { setEmailBlocked, setIsUserSignIn } from '@services/recoil/app';

const useEmailBlocked = () => {
  const handleSignIn = () => {
    setIsUserSignIn(true);
    setEmailBlocked(false);
  };

  return { handleSignIn };
};

export default useEmailBlocked;
