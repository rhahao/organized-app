import { setEmailBlocked, setUserSignIn } from '@services/recoil/app';

const useEmailBlocked = () => {
  const handleSignIn = () => {
    setUserSignIn(true);
    setEmailBlocked(false);
  };

  return { handleSignIn };
};

export default useEmailBlocked;
