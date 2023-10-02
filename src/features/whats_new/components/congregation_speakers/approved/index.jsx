import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useApproved from './useApproved';

const CongregationSpeakersRequestApproved = () => {
  const { t } = useAppTranslation();

  const { speakersRequests, handleAcknowledge } = useApproved();

  return (
    <Box sx={{ marginBottom: '15px', borderBottom: '1px outset', paddingBottom: '15px' }}>
      <Box sx={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {speakersRequests.map((request) => (
          <Box
            key={request.cong_number}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              border: '1px outset',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <Typography>
              <Markup
                content={t('visitingSpeakersRequestApproved', {
                  congregation: `${request.cong_name} (${request.cong_number})`,
                })}
              />
            </Typography>
            <IconButton color="primary" onClick={() => handleAcknowledge(request.cong_number)}>
              <ThumbUpIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Typography>{t('visitingSpeakersRequestApprovedNote')}</Typography>
    </Box>
  );
};

export default CongregationSpeakersRequestApproved;
