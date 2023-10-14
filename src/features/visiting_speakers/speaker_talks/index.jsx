import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useSpeakerTalks from './useSpeakerTalks';
import { useAppTranslation } from '@hooks/index';

const SpeakerTalk = ({ speaker, readOnly }) => {
  const { t } = useAppTranslation();

  const { handleTalksUpdate, isEditor, selectedTalks, talksList } = useSpeakerTalks({ speaker });

  return (
    <>
      {talksList.length === 0 && (
        <Typography sx={{ fontSize: '14px', fontStyle: 'italic' }} color="orange">
          {t('talksListEmpty')}
        </Typography>
      )}
      {talksList.length > 0 && (
        <Autocomplete
          multiple
          size="small"
          fullWidth
          sx={{ maxWidth: '450px' }}
          options={talksList}
          value={selectedTalks}
          isOptionEqualToValue={(option, value) => option.talk_number === value.talk_number}
          readOnly={readOnly || !isEditor}
          freeSolo={readOnly}
          onChange={(_, value) => handleTalksUpdate(value)}
          getOptionLabel={(option) => option.talk_number.toString()}
          renderOption={(props, option) => <li {...props}>{`(${option.talk_number}) ${option.talk_title}`}</li>}
          renderInput={(params) => <TextField {...params} variant="outlined" label={t('talks')} />}
          noOptionsText={t('talksListEmpty')}
        />
      )}
    </>
  );
};

SpeakerTalk.propTypes = {
  speaker: PropTypes.object,
  readOnly: PropTypes.bool,
};

export default SpeakerTalk;
