import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import useAddLocal from './useAddLocal';
import { useAppTranslation } from '@hooks/index';

const LocalSpeakerAdd = () => {
  const { t } = useAppTranslation();

  const { handleAddVisitingSpeaker, options, selectedPerson, setSelectedPerson } = useAddLocal();

  return (
    <Box sx={{ maxWidth: '320px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
      <Autocomplete
        id="select-visiting-speaker"
        size="small"
        fullWidth
        value={selectedPerson}
        onChange={(e, value) => setSelectedPerson(value)}
        options={options}
        getOptionLabel={(option) => option.person_name}
        isOptionEqualToValue={(option, value) => option.person_uid === value.person_uid}
        renderInput={(params) => <TextField {...params} variant="outlined" label={t('record')} />}
        noOptionsText={t('noMatchRecord')}
      />
      <IconButton aria-label="add" color="success" disabled={!selectedPerson} onClick={handleAddVisitingSpeaker}>
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

export default LocalSpeakerAdd;
