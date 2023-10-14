import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import useServiceItem from './useServiceItem';
import { useAppTranslation } from '@hooks/index';

const PersonServiceItem = ({ currentService, otherService, setOtherService }) => {
  const { t } = useAppTranslation();

  const {
    handleEndDateChange,
    handleRemoveStatus,
    handleStartDateChange,
    handleStatusChange,
    secretaryRole,
    shortDatePickerFormat,
  } = useServiceItem({ currentService, otherService, setOtherService });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
      <TextField
        id="outlined-select-service"
        select
        label={t('service')}
        size="medium"
        sx={{ minWidth: '250px' }}
        defaultValue=""
        InputProps={{ readOnly: !secretaryRole }}
        value={currentService.service}
        onChange={secretaryRole ? (e) => handleStatusChange(e.target.value) : null}
      >
        <MenuItem value="auxiliaryPioneer">{t('auxiliaryPioneer')}</MenuItem>
        <MenuItem value="regularPioneer">{t('regularPioneer')}</MenuItem>
        <MenuItem value="specialPioneer">{t('specialPioneer')}</MenuItem>
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          id="service-start-date"
          label={t('startDate')}
          sx={{ width: '200px' }}
          format={shortDatePickerFormat}
          value={currentService.startDate === null ? null : new Date(currentService.startDate)}
          onChange={(value) => handleStartDateChange(value)}
          readOnly={!secretaryRole}
        />
      </LocalizationProvider>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="service-end-date"
            label={t('endDate')}
            sx={{ width: '200px' }}
            format={shortDatePickerFormat}
            value={currentService.endDate === null ? null : new Date(currentService.endDate)}
            onChange={(value) => handleEndDateChange(value)}
            readOnly={!secretaryRole}
          />
        </LocalizationProvider>
        {secretaryRole && (
          <IconButton aria-label="delete" color="error" size="large" onClick={handleRemoveStatus}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

PersonServiceItem.propTypes = {
  currentService: PropTypes.object,
  otherService: PropTypes.arrayOf(PropTypes.object),
  setOtherService: PropTypes.func,
};

export default PersonServiceItem;
