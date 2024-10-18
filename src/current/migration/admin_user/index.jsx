import { Divider, Stack, Typography } from '@mui/material';
import ActionSteps from '../action_steps';

const AdminUser = () => {
  return (
    <Stack spacing="12px">
      <Typography>
        The Congregation Program for Everyone (CPE) has been rebranded to a new application called Organized, featuring
        new look and enhanced features. As an administrator to the congregation account in CPE, you have to complete the
        steps below to migrate your current data into Organized.
      </Typography>

      <Typography color="red" sx={{ fontWeight: 'bold' }}>
        ⛔ If there are more than one administrator in your congregation, make sure these steps are only done by one
        person. If you use multiple devices, make sure to use the one that has the most recent data.
      </Typography>

      <Divider />

      <ActionSteps />
    </Stack>
  );
};

export default AdminUser;
