import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DevicesIcon from '@mui/icons-material/Devices';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useSessionItem from './useSessionItem';
import { useAppTranslation } from '@hooks/index';

const UserPocketDeviceItem = ({ device }) => {
  const { t } = useAppTranslation();

  const { deviceLastSeen, handleDeleteDevice, isSelf } = useSessionItem({ device });

  return (
    <Grid item xs={12} sm={6} lg={4}>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DevicesIcon
              sx={{
                fontSize: '60px',
                marginRight: '10px',
                color: '#1976d2',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Typography
                sx={{ fontSize: '14px' }}
              >{`IP: ${device.visitor_details.ip} - ${device.visitor_details.ipLocation.country_name}`}</Typography>
              <Box>
                <Chip
                  label={deviceLastSeen}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </Box>
          </Box>
          {isSelf && (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="error" sx={{ marginBottom: '10px' }} onClick={handleDeleteDevice}>
                {t('sessionRevoke')}
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

UserPocketDeviceItem.propTypes = {
  device: PropTypes.object,
};

export default UserPocketDeviceItem;
