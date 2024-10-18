import { Button, Stack, Typography } from '@mui/material';

const ActionMigrate = () => {
  return (
    <Stack spacing="16px">
      <Typography>
        You are now ready to migrate your congregation data. Click the "Sync data now" to proceed.
      </Typography>

      <Button variant="contained">Sync data now</Button>
    </Stack>
  );
};

export default ActionMigrate;
