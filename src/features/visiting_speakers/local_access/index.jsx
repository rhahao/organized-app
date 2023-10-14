import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useLocalAccess from './useLocalAccess';
import { useAppTranslation } from '@hooks/index';

const LocalSpeakersAccess = ({ speakersAccessOpen }) => {
  const { t } = useAppTranslation();

  const { handleChange, isEditor, isProcessing, options } = useLocalAccess({ speakersAccessOpen });

  return (
    <Collapse in={speakersAccessOpen} timeout="auto" unmountOnExit>
      <Box sx={{ border: '1px outset', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
        {isProcessing && (
          <CircularProgress
            color="secondary"
            size={20}
            disableShrink={true}
            sx={{ display: 'flex', margin: '10px auto' }}
          />
        )}
        {!isProcessing && (
          <Box>
            {options.length === 0 && <Typography>{t('visitingSpeakersAccessNone')}</Typography>}
            {options.length > 0 && (
              <Box sx={{ marginBottom: '15px' }}>
                <Typography sx={{ marginBottom: '15px' }}>{t('visitingSpeakersAccessList')}</Typography>
                <Autocomplete
                  id="public_talk_selector"
                  size="small"
                  readOnly={!isEditor}
                  multiple
                  fullWidth
                  sx={{ padding: '0 15px' }}
                  value={options}
                  onChange={(e, value) => handleChange(value)}
                  options={options}
                  getOptionLabel={(option) => `(${option.cong_number}) ${option.cong_name}`}
                  isOptionEqualToValue={(option, value) => option.cong_number === value.cong_number}
                  renderInput={(params) => <TextField {...params} variant="standard" />}
                  noOptionsText={t('noMatchRecord')}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Collapse>
  );
};

LocalSpeakersAccess.propTypes = {
  speakersAccessOpen: PropTypes.bool,
};

export default LocalSpeakersAccess;
