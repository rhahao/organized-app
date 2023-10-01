import useAppTranslation from '@hooks/useAppTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useSignup from './useSignup';

const PocketSignUp = () => {
  const { t } = useAppTranslation();

  const { handleReturnChooser, handleSignUp, isOnline, isProcessing, setCode, visitorID, code } = useSignup();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('welcome')}
      </Typography>

      <Typography sx={{ marginBottom: '20px' }}>{t('accountSetup')}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '290px' }}>
        <TextField
          sx={{
            width: '100%',
            '.MuiInputBase-input': {
              fontSize: '20px',
              textAlign: 'center',
              textTransform: 'uppercase',
            },
          }}
          id="outlined-signup-code"
          label={t('activationCode')}
          variant="outlined"
          autoComplete="off"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Button color="inherit" variant="contained" disabled={isProcessing} onClick={handleReturnChooser}>
          {t('back')}
        </Button>
        <Button
          variant="contained"
          disabled={!isOnline || isProcessing || visitorID.toString().length === 0}
          endIcon={visitorID.toString().length === 0 || isProcessing ? <CircularProgress size={25} /> : null}
          onClick={handleSignUp}
        >
          {t('activate')}
        </Button>
      </Box>
    </Container>
  );
};

export default PocketSignUp;
