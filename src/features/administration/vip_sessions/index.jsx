import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useVIPSessions from './useVIPSessions';
import { useAppTranslation } from '@hooks/index';

const CongregationUserVIPSessions = ({ session, handleRevokeSession }) => {
  const { t } = useAppTranslation();

  const { infoIP, lastSeen, visitorID } = useVIPSessions({ session });

  return (
    <Grid item xs={12} lg={6}>
      <Paper elevation={8} sx={{ padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GpsFixedIcon sx={{ fontSize: '60px', marginRight: '10px', color: '#1976d2' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>{`IP: ${infoIP}`}</Typography>
              <Typography>{session.visitor_details.browser || ''}</Typography>
              <Typography>{t('lastSeen', { last_seen: lastSeen })}</Typography>
              {visitorID === session.visitorid && (
                <Box>
                  <Chip
                    label={t('currentSession')}
                    sx={{
                      backgroundColor: '#145A32',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          {visitorID !== session.visitorid && (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginBottom: '10px' }}
                onClick={() => handleRevokeSession(session.visitorid)}
              >
                {t('sessionRevoke')}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

CongregationUserVIPSessions.propTypes = {
  session: PropTypes.object,
  handleRevokeSession: PropTypes.func,
};

export default CongregationUserVIPSessions;
