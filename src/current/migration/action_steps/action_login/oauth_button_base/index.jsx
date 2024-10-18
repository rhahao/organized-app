import { getAuth, indexedDBLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Button, Typography } from '@mui/material';
import { isAuthProcessingCPEState, isEmailAuthCPEState } from '../../../states/main';
import useSnackBar from '../../../hooks/useSnackBar';

const OAuthButtonBase = ({ buttonStyles, logo, text, provider, isEmail }) => {
  const { showMessage } = useSnackBar();

  const setIsEmailAuth = useSetRecoilState(isEmailAuthCPEState);

  const isAuthProcessing = useRecoilValue(isAuthProcessingCPEState);

  const handleOAuthAction = async () => {
    try {
      const auth = getAuth();
      await setPersistence(auth, indexedDBLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      // proceed to signin migration
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const handleEmailAuth = () => setIsEmailAuth(true);

  const handleAction = () => {
    if (isEmail) handleEmailAuth();

    if (!isEmail) handleOAuthAction();
  };

  return (
    <Button
      variant="contained"
      sx={{ ...buttonStyles, height: '41px', padding: 0, width: '320px', justifyContent: 'flex-start' }}
      onClick={handleAction}
      disabled={isAuthProcessing}
    >
      <Box sx={{ width: '50px', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '10px',
            marginLeft: '1px',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img alt="Icon" src={logo} style={{ width: '18px', height: '18px' }} />
        </Box>
      </Box>
      <Typography sx={{ textTransform: 'none' }}>{text}</Typography>
    </Button>
  );
};

export default OAuthButtonBase;
