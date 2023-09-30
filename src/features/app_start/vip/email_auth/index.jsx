import useAppTranslation from '@hooks/useAppTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useEmailAuth from './useEmailAuth';

const EmailAuth = () => {
  const { t } = useAppTranslation();

  const { isProcessing, setUserTmpEmail, handleProviderSignIn, handleSendLink, userTmpEmail } = useEmailAuth();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('emailAuth')}
      </Typography>

      <Typography sx={{ marginBottom: '20px' }}>{t('emailAuthDesc')}</Typography>

      <Box sx={{ maxWidth: '500px' }}>
        <TextField
          id="outlined-basic"
          label={t('email')}
          variant="outlined"
          sx={{ width: '100%' }}
          type="email"
          value={userTmpEmail}
          onChange={(e) => setUserTmpEmail(e.target.value)}
        />

        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <Link component="button" underline="none" variant="body1" onClick={handleProviderSignIn}>
            {t('authProvider')}
          </Link>
          <Button
            variant="contained"
            disabled={isProcessing}
            endIcon={isProcessing ? <CircularProgress size={25} /> : null}
            onClick={handleSendLink}
          >
            {t('sendLink')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailAuth;
