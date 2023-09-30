import Signup from '../signup';
import useStartup from './useStartup';

const VipStartup = () => {
  const { isUserSignUp } = useStartup();
  return <>{isUserSignUp && <Signup />}</>;
};

export default VipStartup;
