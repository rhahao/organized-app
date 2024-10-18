import { Stack } from '@mui/material';
import OAuthLogin from './oauth_login';
import useActionLogin from './useActionLogin';

const ActionLogin = () => {
  useActionLogin();

  return (
    <Stack>
      <OAuthLogin />
    </Stack>
  );
};

export default ActionLogin;
