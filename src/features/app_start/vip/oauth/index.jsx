import Box from '@mui/material/Box';
import { OAuthEmail, OAuthGitHub, OAuthGoogle, OAuthMicrosoft, OAuthYahoo } from './components';

const OAuth = () => {
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

export default OAuth;
