import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import useTimeAwayItem from './useTimeAwayItem';
import { useAppTranslation } from '@hooks/index';

const PersonTimeAwayItem = ({ timeAway, timeAways, setTimeAway }) => {
  const { t } = useAppTranslation();

  const {
    handleCommentsChange,
    handleExpiredChange,
    handleRemoveTimeAway,
    handleStartedChange,
    isEditAllowed,
    shortDatePickerFormat,
    comments,
  } = useTimeAwayItem({ timeAway, timeAways, setTimeAway });

  return (
    <Box
      id="time-away-item"
      sx={{
        border: '1px outset',
        width: '100%',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '15px',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="start-date-time-away-picker"
              label={t('startDate')}
              format={shortDatePickerFormat}
              value={timeAway.startDate === null ? null : new Date(timeAway.startDate)}
              onChange={(value) => handleStartedChange(value)}
              readOnly={!isEditAllowed}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id="end-date-time-away-picker"
              label={t('endDate')}
              format={shortDatePickerFormat}
              value={timeAway.endDate === null ? null : new Date(timeAway.endDate)}
              onChange={(value) => handleExpiredChange(value)}
              readOnly={!isEditAllowed}
            />
          </LocalizationProvider>
        </Box>
        <TextField
          label={t('comments')}
          variant="outlined"
          autoComplete="off"
          sx={{ flexGrow: 1 }}
          value={comments}
          onChange={(e) => handleCommentsChange(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px',
        }}
      >
        <Button variant="outlined" color="error" startIcon={<ClearIcon />} onClick={handleRemoveTimeAway}>
          {t('delete')}
        </Button>
      </Box>
    </Box>
  );
};

PersonTimeAwayItem.propTypes = {
  timeAway: PropTypes.object,
  timeAways: PropTypes.arrayOf(PropTypes.object),
  setTimeAway: PropTypes.func,
};

export default PersonTimeAwayItem;
