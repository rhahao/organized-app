import { Button, Stack, Typography } from '@mui/material';
import PasswordField from '../password_field';

const AccessCode = () => {
  return (
    <Stack spacing="16px">
      <Typography sx={{ fontWeight: 'bold' }}>Create congregation access code</Typography>
      <Typography>
        This is your congregation’s unique code for connecting new users and loggin in. It encrypts data and is required
        for accessing your congregation in the Organized app. Create a code that’s simple yet secure.
      </Typography>

      <PasswordField label="Create access code" sx={{ marginTop: '24px !important' }} />
      <PasswordField label="Confirm access code" />

      <Button variant="contained">Set access code</Button>
    </Stack>
  );
};

export default AccessCode;
