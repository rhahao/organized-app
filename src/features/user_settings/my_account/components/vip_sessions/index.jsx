import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useSessions from './useSessions';
import UserVIPSessionItem from './components';
import { useAppTranslation } from '@hooks/index';

const UserVIPSessions = () => {
  const { t } = useAppTranslation();

  const { sessions, setSessions } = useSessions();

  return (
    <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
      <Typography>{t('sessionsDesc')}</Typography>
      <Box
        sx={{
          maxWidth: '500px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        {sessions.length > 0 &&
          sessions.map((session) => (
            <UserVIPSessionItem key={session.visitorid} session={session} setSessions={(value) => setSessions(value)} />
          ))}
      </Box>
    </Box>
  );
};

export default UserVIPSessions;
