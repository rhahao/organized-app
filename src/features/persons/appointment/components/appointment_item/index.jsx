import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import useAppointmentItem from './useAppointmentItem';
import { useAppTranslation } from '@hooks/index';

const PersonAppointmentItem = ({ isFemale, currentStatus, spiritualStatus, setSpiritualStatus }) => {
  const { t } = useAppTranslation();

  const {
    handleEndDateChange,
    handleRemoveStatus,
    handleStartDateChange,
    handleStatusChange,
    secretaryRole,
    shortDatePickerFormat,
  } = useAppointmentItem({ currentStatus, spiritualStatus, setSpiritualStatus });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
      <TextField
        id="outlined-select-status"
        select
        label={t('spiritualStatus')}
        size="medium"
        sx={{ minWidth: '250px' }}
        defaultValue=""
        InputProps={{ readOnly: !secretaryRole }}
        value={currentStatus.status}
        onChange={secretaryRole ? (e) => handleStatusChange(e.target.value) : null}
      >
        <MenuItem value="publisher">{t('publisher')}</MenuItem>
        {!isFemale && <MenuItem value="ms">{t('ministerialServant')}</MenuItem>}
        {!isFemale && <MenuItem value="elder">{t('elder')}</MenuItem>}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          id="status-start-date"
          label={t('startDate')}
          sx={{ width: '200px' }}
          format={shortDatePickerFormat}
          value={currentStatus.startDate === null ? null : new Date(currentStatus.startDate)}
          onChange={(value) => handleStartDateChange(value)}
          readOnly={!secretaryRole}
        />
      </LocalizationProvider>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            id="status-end-date"
            label={t('endDate')}
            sx={{ width: '200px' }}
            format={shortDatePickerFormat}
            value={currentStatus.endDate === null ? null : new Date(currentStatus.endDate)}
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

PersonAppointmentItem.propTypes = {
  isFemale: PropTypes.bool,
  currentStatus: PropTypes.object,
  spiritualStatus: PropTypes.arrayOf(PropTypes.object),
  setSpiritualStatus: PropTypes.func,
};

export default PersonAppointmentItem;
