import { Markup } from 'interweave';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import OAuth from '../oauth';
import useSignin from './useSignin';

const Signin = () => {
  const { t } = useAppTranslation();

  const { handleSignUp } = useSignin();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('signIn')}
      </Typography>

      <Typography sx={{ marginBottom: '20px' }}>
        <Markup content={t('signInDesc')} />
      </Typography>

      <OAuth />

      <Link component="button" variant="body1" onClick={handleSignUp} sx={{ marginTop: '15px' }}>
        {t('createSwsAccount')}
      </Link>
    </Container>
  );
};

export default Signin;
