import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useBasic from './useBasic';
import { useAppTranslation } from '@hooks/index';

const BasicSettings = () => {
  const { t } = useAppTranslation();

  const {
    congName,
    congNumber,
    lmmoRole,
    coordinatorRole,
    publicTalkCoordinatorRole,
    tempMidweekMeetingDay,
    tempClassCount,
    tempMeetingTime,
    tempCOName,
    tempCODisplayName,
    tmpautoAssignMMOpeningPrayer,
    tmpautoAssignWMOpeningPrayer,
    useFullname,
    tempWeekendMeetingDay,
    tmpMidweekMeetingExactDate,
    tmpWeekendMeetingSubstituteSpeaker,
    handleMidweekMeetingDayChange,
    handleClassChange,
    handleMeetingTimeChange,
    handleChangeCOName,
    handleChangeCODispName,
    handleSwitchMMAutoAssignPrayer,
    handleSwitchWMAutoAssignPrayer,
    handleChangeFullnameSwitch,
    handleWeekendMeetingDayChange,
    handleSwitchMMExactDate,
    handleSwitchWMSubstituteSpeaker,
  } = useBasic();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography className={'settingHeader'}>{t('aboutCongregation')}</Typography>
      <Divider sx={{ borderWidth: '5px' }} />
      <Box sx={{ padding: '20px 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <TextField
            id="outlined-basic"
            label={t('congregation')}
            variant="outlined"
            size="small"
            autoComplete="off"
            required
            sx={{ width: '320px' }}
            value={congName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label={t('number')}
            variant="outlined"
            size="small"
            autoComplete="off"
            required
            sx={{ width: '120px' }}
            value={congNumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{t('midweekMeeting')}</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '15px',
              margin: '15px 0',
            }}
          >
            <TextField
              id="outlined-select-day"
              select
              label={t('meetingDay')}
              value={tempMidweekMeetingDay}
              defaultValue={3}
              onChange={handleMidweekMeetingDayChange}
              size="small"
              sx={{ minWidth: 150 }}
              InputProps={{ readOnly: !lmmoRole }}
            >
              <MenuItem value={1}>{t('monday')}</MenuItem>
              <MenuItem value={2}>{t('tuesday')}</MenuItem>
              <MenuItem value={3}>{t('wednesday')}</MenuItem>
              <MenuItem value={4}>{t('thursday')}</MenuItem>
              <MenuItem value={5}>{t('friday')}</MenuItem>
              <MenuItem value={6}>{t('saturday')}</MenuItem>
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label={t('time')}
                value={tempMeetingTime}
                onChange={handleMeetingTimeChange}
                readOnly={!lmmoRole}
                sx={{
                  '.MuiInputBase-formControl': {
                    height: '40.5px',
                    width: '180px',
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-select-class"
              select
              label={t('auxClass')}
              value={tempClassCount}
              defaultValue={1}
              onChange={handleClassChange}
              InputProps={{ readOnly: !lmmoRole }}
              size="small"
              sx={{ width: '150px' }}
            >
              <MenuItem value={1}>{t('no')}</MenuItem>
              <MenuItem value={2}>{t('yes')}</MenuItem>
            </TextField>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={tmpautoAssignMMOpeningPrayer}
                readOnly={!lmmoRole}
                onChange={lmmoRole ? (e) => handleSwitchMMAutoAssignPrayer(e.target.checked) : null}
              />
            }
            label={t('autoAssignMMOpeningPrayer')}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={useFullname}
                readOnly={!lmmoRole}
                onChange={lmmoRole ? (e) => handleChangeFullnameSwitch(e.target.checked) : null}
              />
            }
            label={t('scheduleUseFullname')}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={tmpMidweekMeetingExactDate}
                readOnly={!lmmoRole}
                onChange={lmmoRole ? (e) => handleSwitchMMExactDate(e.target.checked) : null}
              />
            }
            label={t('useExactMidweekMeetingDate')}
          />
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{t('weekendMeeting')}</Typography>
          <Box sx={{ marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="outlined-select-day"
              select
              label={t('meetingDay')}
              value={tempWeekendMeetingDay}
              defaultValue={6}
              onChange={handleWeekendMeetingDayChange}
              size="small"
              sx={{ minWidth: 150, width: 'fit-content', marginBottom: '15px' }}
              InputProps={{ readOnly: !coordinatorRole }}
            >
              <MenuItem value={6}>{t('saturday')}</MenuItem>
              <MenuItem value={7}>{t('sunday')}</MenuItem>
            </TextField>

            <FormControlLabel
              control={
                <Checkbox
                  checked={tmpautoAssignWMOpeningPrayer}
                  readOnly={!coordinatorRole}
                  onChange={coordinatorRole ? (e) => handleSwitchWMAutoAssignPrayer(e.target.checked) : null}
                />
              }
              label={t('autoAssignWMOpeningPrayer')}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={tmpWeekendMeetingSubstituteSpeaker}
                  readOnly={!publicTalkCoordinatorRole}
                  onChange={publicTalkCoordinatorRole ? (e) => handleSwitchWMSubstituteSpeaker(e.target.checked) : null}
                />
              }
              label={t('useSubtituteSpeaker')}
            />
          </Box>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{t('circuitOverseer')}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
            <TextField
              id="outlined-basic"
              label={t('name')}
              variant="outlined"
              size="small"
              autoComplete="off"
              sx={{ width: '320px' }}
              value={tempCOName}
              onChange={(e) => handleChangeCOName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t('displayName')}
              variant="outlined"
              size="small"
              autoComplete="off"
              sx={{ width: '200px' }}
              value={tempCODisplayName}
              onChange={(e) => handleChangeCODispName(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      {!lmmoRole && (
        <Typography sx={{ fontStyle: 'italic', marginTop: '20px' }} color="#FE4119">
          {t('someSettingLockedLMMO')}
        </Typography>
      )}
      {!coordinatorRole && (
        <Typography sx={{ fontStyle: 'italic', marginTop: '20px' }} color="#FE4119">
          {t('someSettingLockedCoordinator')}
        </Typography>
      )}
    </Box>
  );
};

export default BasicSettings;
