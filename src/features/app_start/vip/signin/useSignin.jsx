import { setIsUserSignIn, setIsUserSignUp } from '@services/recoil/app';

const useSignin = () => {
  const handleSignUp = () => {
    setIsUserSignUp(true);
    setIsUserSignIn(false);
  };

  return { handleSignUp };
};

export default useSignin;
