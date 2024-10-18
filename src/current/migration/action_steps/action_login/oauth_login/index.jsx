import { Box } from '@mui/material';
import OAuthEmail from '../oauth_email';
import OAuthGitHub from '../oauth_github';
import OAuthGoogle from '../oauth_google';
import OAuthMicrosoft from '../oauth_microsoft';
import OAuthYahoo from '../oauth_yahoo';

const OAuthLogin = () => {
  return (
    <Box sx={{ margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px' }}>
      <OAuthGoogle />
      <OAuthGitHub />
      <OAuthYahoo />
      <OAuthMicrosoft />
      <OAuthEmail />
    </Box>
  );
};

export default OAuthLogin;
