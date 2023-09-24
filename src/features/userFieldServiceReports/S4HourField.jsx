import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UserS4Records } from '../../classes/UserS4Records';
import { refreshScreenState } from '../../states/main';

const S4HourField = ({ currentDate }) => {
  const { t } = useTranslation('ui');

  const setScreenRefresh = useSetRecoilState(refreshScreenState);

  const [hasError, setHasError] = useState(false);
  const [value, setValue] = useState('');

  const handleChangeDuration = useCallback(
    async (value) => {
      let currentReport = await UserS4Records.get(currentDate);

      if (!currentReport) {
        currentReport = await UserS4Records.initialize(currentDate);
      }

      currentReport.duration = value;
      currentReport.changes = currentReport.changes.filter((record) => record.field !== 'duration');
      currentReport.changes.push({ date: new Date(), field: 'duration', value });
      await currentReport.save();

      setScreenRefresh((prev) => !prev);
    },
    [currentDate, setScreenRefresh]
  );

  const handlePreChangeCheck = useCallback(
    async (value) => {
      setHasError(false);

      if (value === '') {
        await handleChangeDuration(value);
        return;
      }

      const timeValues = value.split(':');

      if (timeValues.length > 2) {
        setHasError(true);
        return;
      }

      if (timeValues.length === 1) {
        if (isNaN(value)) {
          setHasError(true);
          return;
        }
      }

      if (timeValues.length === 2) {
        const hours = timeValues[0];
        const minutes = timeValues[1];

        if (isNaN(hours) || isNaN(hours)) {
          setHasError(true);
          return;
        }

        if (minutes > 59 || minutes.split('').length > 2) {
          setHasError(true);
          return;
        }
      }

      let hours = timeValues[0];
      if (hours === '') hours = '0';
      const minutes = timeValues[1]?.padStart(2, '0') || '00';

      const finalValue = `${hours}:${minutes}`;

      await handleChangeDuration(finalValue);

      setValue(finalValue);
    },
    [handleChangeDuration]
  );

  const debouncedChangeRequest = useMemo(() => {
    return debounce(handlePreChangeCheck, 1000);
  }, [handlePreChangeCheck]);

  const onChange = (e) => {
    let value = e.target.value;
    if (value === 0 || value === '0') value = '';

    setValue(value);
    debouncedChangeRequest(value);
  };

  useEffect(() => {
    const handleGetReportValue = async () => {
      const data = await UserS4Records.get(currentDate);
      if (data) {
        let tmpValue = '';

        if (data.duration !== 0 && data.duration !== '00:00' && data.duration !== '') {
          tmpValue = data.duration;
        }

        setValue(tmpValue);
      }
    };

    setValue('');
    handleGetReportValue();
  }, [currentDate]);

  return (
    <Box sx={{ margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '280px' }}>
      <Typography sx={{ lineHeight: 1.2, textAlign: 'center', fontSize: '13px', width: '200px', marginBottom: '5px' }}>
        {t('S4Hours')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '188px' }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth={true}
          sx={{ '.MuiOutlinedInput-input': { textAlign: 'center', fontSize: '18px' } }}
          placeholder="H:MM"
          value={value}
          onChange={onChange}
          error={hasError}
        />
      </Box>
    </Box>
  );
};

export default S4HourField;
