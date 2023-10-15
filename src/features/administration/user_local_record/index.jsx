import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useLocalRecord from './useLocalRecord';
import { useAppTranslation } from '@hooks/index';

const CongregationUserLocalRecord = ({ member, handleUpdatePocketLocalId }) => {
  const { t } = useAppTranslation();

  const { persons, value } = useLocalRecord({ member });

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography sx={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px outset', paddingBottom: '5px' }}>
        {t('localRecord')}
      </Typography>
      <Box maxWidth={'280px'}>
        <Autocomplete
          id="tags-standard"
          value={value}
          onChange={(e, value) => handleUpdatePocketLocalId(value)}
          options={persons}
          getOptionLabel={(option) => option.person_name}
          isOptionEqualToValue={(option, value) => option.person_uid === value.person_uid}
          renderInput={(params) => <TextField {...params} variant="standard" label={t('record')} />}
          noOptionsText={t('noMatchRecord')}
        />
      </Box>
    </Box>
  );
};

CongregationUserLocalRecord.propTypes = {
  member: PropTypes.object,
  handleUpdatePocketLocalId: PropTypes.func,
};

export default CongregationUserLocalRecord;
