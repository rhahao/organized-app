import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useDelegates from './useDelegates';
import { useAppTranslation } from '@hooks/index';

const CongregationUserDelegates = ({ person, member, handleUpdateUserDelegate }) => {
  const { t } = useAppTranslation();

  const { value, pocketOptions } = useDelegates({ person, member });

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Box sx={{ marginBottom: '10px', borderBottom: '1px outset', paddingBottom: '5px' }}>
        <Typography sx={{ fontWeight: 'bold' }}>{t('delegatePersons')}</Typography>
        <Typography sx={{ fontSize: '14px' }}>{t('delegatePersonsDesc')}</Typography>
      </Box>

      <Box>
        <Autocomplete
          multiple
          filterSelectedOptions
          id="tags-standard"
          value={value}
          onChange={(e, value) => handleUpdateUserDelegate(value)}
          options={pocketOptions}
          getOptionLabel={(option) => option.username}
          isOptionEqualToValue={(option, value) => option.user_local_uid === value.user_local_uid}
          renderInput={(params) => <TextField {...params} variant="standard" label={t('persons')} />}
          noOptionsText={t('noMatchRecord')}
        />
      </Box>
    </Box>
  );
};

CongregationUserDelegates.propTypes = {
  person: PropTypes.object,
  member: PropTypes.object,
  handleUpdateUserDelegate: PropTypes.func,
};

export default CongregationUserDelegates;
