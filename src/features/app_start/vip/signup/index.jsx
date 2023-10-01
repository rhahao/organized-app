import { useAppTranslation } from '@hooks/index';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import OAuth from '../oauth';
import useSignup from './useSignup';

const Signup = () => {
  const { t } = useAppTranslation();

  const { handleSignIn, handleReturnChooser } = useSignup();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('createSwsAccount')}
      </Typography>

      <Typography sx={{ marginBottom: '20px' }}>{t('newUserAccount')}</Typography>

      <OAuth />

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleReturnChooser}
          sx={{ marginTop: '15px', display: 'flex', gap: '5px' }}
        >
          <KeyboardBackspaceIcon />
          <Typography>{t('back')}</Typography>
        </Link>

        <Link component="button" variant="body1" onClick={handleSignIn} sx={{ marginTop: '15px' }}>
          {t('hasAccount')}
        </Link>
      </Box>

      <Box
        sx={{ fontSize: '14px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '25px' }}
      >
        <Typography sx={{ fontSize: '14px' }}>{t('oauthAccept')}</Typography>
        <Link target="_blank" rel="noopener" href="https://sws2apps.github.io/sws2apps-docs/terms">
          {t('termsUse')}
        </Link>
        <Link target="_blank" rel="noopener" href="https://sws2apps.github.io/sws2apps-docs/privacy">
          {t('privacyPolicy')}
        </Link>
      </Box>
    </Container>
  );
};

export default Signup;
