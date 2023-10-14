import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import useIncomingHeader from './useIncomingHeader';
import { useAppTranslation } from '@hooks/index';

const IncomingCongregationsHeader = ({ handleCongregationAdd }) => {
  const { t } = useAppTranslation();

  const { congConnected, congsList, handleDownloadAllSpeakers, isProcessing } = useIncomingHeader();

  return (
    <Box sx={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
      <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleCongregationAdd}>
        {t('congregationAdd')}
      </Button>
      {congConnected && congsList.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CloudSyncIcon />}
          disabled={isProcessing}
          onClick={handleDownloadAllSpeakers}
        >
          {t('downloadAllSpeakers')}
        </Button>
      )}
    </Box>
  );
};

IncomingCongregationsHeader.propTypes = {
  handleCongregationAdd: PropTypes.func,
};

export default IncomingCongregationsHeader;
