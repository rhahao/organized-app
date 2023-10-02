import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import useWhatsNew from './useWhatsNew';
import { useAppTranslation } from '@hooks/index';
import {
  Announcements,
  CongregationSpeakersRequestApproved,
  CongregationSpeakersRequests,
  FieldServiceReports,
} from './components';

const WhatsNewContent = () => {
  const { t } = useAppTranslation();

  const {
    cnNews,
    cnPendingReports,
    cnSpeakersRequests,
    cnSpeakersRequestsApproved,
    drawerOpen,
    toggleDrawer,
    setWhatsNewOpen,
  } = useWhatsNew();

  return (
    <SwipeableDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <Box
        sx={{
          paddingTop: '50px',
          borderBottom: '1px outset',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ padding: '20px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {t('announcements')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '20px' }}>
          <IconButton color="error" aria-label="close" onClick={() => setWhatsNewOpen(false)}>
            <CloseIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ minWidth: '350px', maxWidth: '650px', padding: '20px' }}>
        {cnNews + cnPendingReports + cnSpeakersRequests + cnSpeakersRequestsApproved === 0 && (
          <Typography sx={{ marginBottom: '15px', borderBottom: '1px outset', paddingBottom: '15px' }}>
            {t('nothingNew')}
          </Typography>
        )}
        <Announcements />
        {cnPendingReports > 0 && <FieldServiceReports />}
        {cnSpeakersRequests > 0 && <CongregationSpeakersRequests />}
        {cnSpeakersRequestsApproved > 0 && <CongregationSpeakersRequestApproved />}
      </Box>
    </SwipeableDrawer>
  );
};

export default WhatsNewContent;
