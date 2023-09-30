import useAppTranslation from '@hooks/useAppTranslation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useEmailLinkAuth from './useEmailLinkAuth';

const EmailLinkAuthentication = () => {
  const { t } = useAppTranslation();

  const { handleRequestNewLink, completeEmailAuth, isProcessing, visitorID } = useEmailLinkAuth();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('emailAuth')}
      </Typography>

      <Box sx={{ maxWidth: '500px' }}>
        <Typography sx={{ marginBottom: '20px' }}>{t('emailAuthDescComplete')}</Typography>

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
          <Link component="button" underline="none" variant="body1" onClick={handleRequestNewLink}>
            {t('resendEmailLink')}
          </Link>
          <Button
            variant="contained"
            disabled={isProcessing || visitorID.toString().length === 0}
            endIcon={isProcessing ? <CircularProgress size={25} /> : null}
            onClick={completeEmailAuth}
          >
            {t('signIn')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailLinkAuthentication;
