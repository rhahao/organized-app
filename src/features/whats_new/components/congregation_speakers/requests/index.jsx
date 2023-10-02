import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useRequests from './useRequests';

const CongregationSpeakersRequests = () => {
  const { t } = useAppTranslation();

  const { speakersRequests, handleApprove, handleDisapprove } = useRequests();

  return (
    <Box sx={{ marginBottom: '15px', borderBottom: '1px outset', paddingBottom: '15px' }}>
      <Typography>{t('visitingSpeakersRequestHeading')}</Typography>
      <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {speakersRequests.map((request) => (
          <Box
            key={request.cong_id}
            sx={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              alignItems: 'center',
              border: '1px outset',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <Typography
              sx={{ marginRight: '20px', fontWeight: 'bold' }}
            >{`${request.cong_name} (${request.cong_number})`}</Typography>
            <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleApprove(request.cong_id)}
              >
                {t('accept')}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DoNotDisturbOnIcon />}
                onClick={() => handleDisapprove(request.cong_id)}
              >
                {t('reject')}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CongregationSpeakersRequests;
