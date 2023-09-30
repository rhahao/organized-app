import { setUserSignIn, setUserSignUp } from '@services/recoil/app';

const useSignup = () => {
  const handleSignIn = () => {
    setUserSignIn(true);
    setUserSignUp(false);
  };

  return { handleSignIn };
};

export default useSignup;
