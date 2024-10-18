import { useRecoilState } from 'recoil';
import { isEmailAuthCPEState } from '../../states/main';

const useActionLogin = () => {
  const [isEmailAuth, setIsEmailAuth] = useRecoilState(isEmailAuthCPEState);

  return { isEmailAuth };
};

export default useActionLogin;
