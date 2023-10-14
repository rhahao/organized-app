import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useCongregationAdd from './useCongregationAdd';
import { useAppTranslation } from '@hooks/index';

const CongregationAdd = ({ isOpen, setOpen }) => {
  const { t } = useAppTranslation();

  const {
    congAccountConnected,
    congName,
    congNumber,
    handleCreateCongreation,
    handleSelectCong,
    isSearching,
    isSync,
    options,
    selectedCong,
    setInputValue,
    setCongName,
    setCongNumber,
    handleClose,
  } = useCongregationAdd({ setOpen });

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <Box
        sx={{ border: '1px outset', margin: '15px 0', borderRadius: '3px', padding: '20px 10px', maxWidth: '400px' }}
      >
        <Box>
          <Typography sx={{ fontSize: '14px', lineHeight: 1.4, marginBottom: '15px' }}>
            {t('congrationAddLabel')}
          </Typography>
          <TextField
            label={t('congregation')}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ maxWidth: '500px', minWidth: '250px', marginBottom: '15px' }}
            value={congName}
            onChange={(e) => setCongName(e.target.value)}
            InputProps={{ readOnly: isSync }}
          />
          <TextField
            label={t('number')}
            variant="outlined"
            type="number"
            size="small"
            sx={{ maxWidth: '250px', minWidth: '100px' }}
            value={congNumber}
            onChange={(e) => setCongNumber(e.target.value)}
            InputProps={{ readOnly: isSync }}
          />
        </Box>

        {congAccountConnected && (
          <Box sx={{ margin: '20px 0' }}>
            <Typography sx={{ fontSize: '14px', lineHeight: 1.4, marginBottom: '15px' }}>
              {t('congrationAddLabelAlternate')}
            </Typography>

            <Autocomplete
              fullWidth={true}
              sx={{ maxWidth: '400px' }}
              size="small"
              isOptionEqualToValue={(option, value) => option.cong_number === value.cong_number}
              getOptionLabel={(option) => `(${option.cong_number}) ${option.cong_name}`}
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              value={selectedCong}
              noOptionsText={t('noOptions')}
              loadingText={t('loading')}
              onChange={(_, newValue) => {
                handleSelectCong(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  ({option.cong_number}) {option.cong_name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('congregation')}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Box>
        )}

        <Box sx={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button
            variant="outlined"
            color="success"
            startIcon={<SaveIcon />}
            disabled={selectedCong === null && (congName.length === 0 || congNumber.length === 0)}
            onClick={handleCreateCongreation}
          >
            {t('save')}
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
};

CongregationAdd.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default CongregationAdd;
