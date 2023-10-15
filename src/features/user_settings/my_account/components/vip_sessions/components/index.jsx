import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Typography from '@mui/material/Typography';
import useSessionItem from './useSessionItem';
import { useAppTranslation } from '@hooks/index';

const UserVIPSessionItem = ({ session, setSessions }) => {
  const { t } = useAppTranslation();

  const { handleRevokeSession, isSelf, lastSeen } = useSessionItem({ session, setSessions });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px outset',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <GpsFixedIcon sx={{ fontSize: '60px', marginRight: '10px', color: '#1976d2' }} />
        <Box>
          <Typography sx={{ fontSize: '14px' }}>{`${session.ip} - ${session.country_name}`}</Typography>
          <Typography sx={{ fontSize: '14px' }}>{`${session.device.browserName} - ${session.device.os}`}</Typography>
          <Typography sx={{ fontSize: '14px' }}>{t('lastSeen', { last_seen: lastSeen })}</Typography>
          {isSelf && (
            <Chip
              label={t('currentSession')}
              sx={{
                backgroundColor: '#145A32',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
      </Box>
      {!isSelf && (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
          <Button onClick={handleRevokeSession} variant="outlined" color="error" sx={{ marginBottom: '10px' }}>
            {t('sessionRevoke')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

UserVIPSessionItem.propTypes = {
  session: PropTypes.object,
  setSessions: PropTypes.func,
};

export default UserVIPSessionItem;
