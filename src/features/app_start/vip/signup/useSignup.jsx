import { handleUpdateSetting } from '@services/dexie/settings';
import { setIsAccountChoose, setIsUserSignIn, setIsUserSignUp } from '@services/recoil/app';

const useSignup = () => {
  const handleSignIn = () => {
    setIsUserSignIn(true);
    setIsUserSignUp(false);
  };

  const handleReturnChooser = async () => {
    await handleUpdateSetting({ account_type: '' });
    setIsAccountChoose(true);
  };

  return { handleSignIn, handleReturnChooser };
};

export default useSignup;
