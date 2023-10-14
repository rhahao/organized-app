import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SpeakerTalk from '../speaker_talks';
import useOutgoing from './useOutgoing';
import { useAppTranslation } from '@hooks/index';

const OutgoingSpeaker = ({ speaker }) => {
  const { t } = useAppTranslation();

  const { handleDeleteVisitingSpeaker } = useOutgoing({ speaker });

  return (
    <Box
      sx={{
        borderBottom: '2px outset',
        padding: '20px 0 15px 0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <TextField
        label={t('name')}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ maxWidth: '320px' }}
        value={speaker.person_name}
        InputProps={{
          readOnly: true,
        }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexGrow: 1, minWidth: '300px', gap: '10px' }}>
        <SpeakerTalk speaker={speaker} />
        <IconButton color="error" onClick={handleDeleteVisitingSpeaker}>
          <DeleteIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

OutgoingSpeaker.propTypes = {
  speaker: PropTypes.object,
};

export default OutgoingSpeaker;
