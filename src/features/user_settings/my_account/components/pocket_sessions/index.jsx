import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserPocketDeviceItem from './components';
import useSessions from './useSessions';
import { useAppTranslation } from '@hooks/index';

const UserPocketDevices = () => {
  const { t } = useAppTranslation();

  const { sessions } = useSessions();

  return (
    <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
      <Typography sx={{ marginBottom: '10px' }}>{t('sessionsDesc')}</Typography>
      <Grid container flexGrow={1} spacing={2}>
        {sessions.length > 0 &&
          sessions.map((session) => <UserPocketDeviceItem key={session.visitorid} device={session} />)}
      </Grid>
    </Box>
  );
};

export default UserPocketDevices;
