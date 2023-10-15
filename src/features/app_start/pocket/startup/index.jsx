import Box from '@mui/material/Box';
import PocketSignUp from '../signup';
import { WaitingCircular } from '@components/index';
import useStartup from './useStartup';

const PocketStartup = () => {
  const { isSignUp } = useStartup();

  return (
    <Box>
      {isSignUp && <PocketSignUp />}
      {!isSignUp && <WaitingCircular />}
    </Box>
  );
};

export default PocketStartup;
