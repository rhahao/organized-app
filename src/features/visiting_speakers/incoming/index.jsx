import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import SpeakerTalk from '../speaker_talks';
import useIncoming from './useIncoming';
import { useAppTranslation } from '@hooks/index';

const IncomingSpeaker = ({ isNew, speaker, cong_number }) => {
  const { t } = useAppTranslation();

  const {
    handleAddSpeaker,
    handleDeleteSpeaker,
    handleDisplayNameChange,
    handleElderCheck,
    handleEmailChange,
    handleMSCheck,
    handleNameChange,
    handlePhoneChange,
    readOnly,
    speakerDisplayName,
    speakerEmail,
    speakerIsElder,
    speakerIsMS,
    speakerName,
    speakerPhone,
    handleCancel,
  } = useIncoming({ isNew, speaker, cong_number });

  return (
    <Box sx={{ borderBottom: isNew ? '' : '2px outset', padding: '20px 0 15px 0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <TextField
          label={t('name')}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: '320px' }}
          InputProps={{ readOnly }}
          value={speakerName}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <TextField
          label={t('displayName')}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: '190px' }}
          InputProps={{ readOnly }}
          value={speakerDisplayName}
          onChange={(e) => handleDisplayNameChange(e.target.value)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
          <FormControlLabel
            control={<Checkbox />}
            label={t('elder')}
            checked={speakerIsElder}
            onChange={readOnly ? null : (e) => handleElderCheck(e.target.checked)}
            sx={{ '.MuiFormControlLabel-label': { lineHeight: 1.2 } }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label={t('ministerialServant')}
            checked={speakerIsMS}
            onChange={readOnly ? null : (e) => handleMSCheck(e.target.checked)}
            sx={{ '.MuiFormControlLabel-label': { lineHeight: 1.2 } }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: '15px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <TextField
          label={t('email')}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: '300px' }}
          InputProps={{ readOnly }}
          value={speakerEmail}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <TextField
          label={t('phoneNumber')}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: '210px' }}
          InputProps={{ readOnly }}
          value={speakerPhone}
          onChange={(e) => handlePhoneChange(e.target.value)}
        />
      </Box>

      {!isNew && (
        <Box sx={{ marginTop: '15px' }}>
          <SpeakerTalk speaker={speaker} readOnly={readOnly} />

          {!readOnly && (
            <Button
              sx={{ marginTop: '15px' }}
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleDeleteSpeaker}
            >
              {t('delete')}
            </Button>
          )}
        </Box>
      )}

      {isNew && (
        <Box sx={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<AddCircleIcon />}
            onClick={handleAddSpeaker}
            disabled={speakerName === '' || speakerDisplayName === '' || (!speakerIsElder && !speakerIsMS)}
          >
            {t('add')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

IncomingSpeaker.propTypes = {
  isNew: PropTypes.bool,
  speaker: PropTypes.object,
  cong_number: PropTypes.number,
};

export default IncomingSpeaker;
