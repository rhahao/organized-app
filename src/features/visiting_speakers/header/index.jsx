import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import ShareIcon from '@mui/icons-material/Share';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import Typography from '@mui/material/Typography';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import useHeader from './useHeader';

const VisitingSpeakersHeader = ({ cong, isSelf, handleToggleAccessOpen }) => {
  const {
    congConnected,
    handleDeleteCongregation,
    handleDownloadSpeakers,
    handleShareSpeakers,
    isEditor,
    isProcessing,
    requestDispproved,
    requestPending,
  } = useHeader({ cong });

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {isSelf && <HomeIcon color="primary" sx={{ fontSize: '25px' }} />}
        {!isSelf && cong.is_local && <SignalWifiConnectedNoInternet4Icon color="primary" sx={{ fontSize: '25px' }} />}
        {!isSelf && !cong.is_local && !requestDispproved && (
          <SignalWifi4BarIcon color={requestPending ? 'warning' : 'success'} sx={{ fontSize: '25px' }} />
        )}
        {requestDispproved && <SignalWifiStatusbarConnectedNoInternet4Icon color="error" sx={{ fontSize: '25px' }} />}
        <Typography>{`${cong.cong_name} (${cong.cong_number})`}</Typography>
      </Box>

      {isProcessing && <CircularProgress color="secondary" size={30} disableShrink={true} />}

      {isEditor && congConnected && !isProcessing && isSelf && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconButton aria-label="share" color="error" onClick={handleToggleAccessOpen} sx={{ padding: '4px' }}>
            <KeyIcon />
          </IconButton>
          <IconButton aria-label="share" color="primary" onClick={handleShareSpeakers} sx={{ padding: '4px' }}>
            <ShareIcon />
          </IconButton>
        </Box>
      )}

      {isEditor && !isProcessing && !isSelf && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!requestDispproved && congConnected && !cong.is_local && (
            <IconButton aria-label="share" color="secondary" sx={{ padding: '4px' }} onClick={handleDownloadSpeakers}>
              <CloudSyncIcon />
            </IconButton>
          )}

          <IconButton aria-label="delete" color="error" sx={{ padding: '4px' }} onClick={handleDeleteCongregation}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

VisitingSpeakersHeader.propTypes = {
  cong: PropTypes.object,
  isSelf: PropTypes.bool,
  handleToggleAccessOpen: PropTypes.func,
};

export default VisitingSpeakersHeader;
