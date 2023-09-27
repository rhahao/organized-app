import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UserS4Records } from '../../classes/UserS4Records';
import { refreshScreenState } from '../../states/main';
import { UserS4MonthlyReport } from '../../classes/UserS4MonthlyReport';

const getClassField = (fldType) => {
  if (fldType === 'S4Placements') return 'placements';
  if (fldType === 'S4Video') return 'videos';
  if (fldType === 'S4ReturnVisits') return 'returnVisits';
};

const S4GenericField = ({ fldType, currentDate, month }) => {
  const { t } = useTranslation('ui');

  const [screenRefresh, setScreenRefresh] = useRecoilState(refreshScreenState);

  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fldName = useMemo(() => t(fldType), [fldType, t]);

  const handleIncreaseCount = async () => {
    const tmp = +value + 1;
    await handleUpdateRecord(tmp);
  };

  const handleDecreaseCount = async () => {
    if (value !== '' || value > 0) {
      let tmp = '';
      if (value > 1) tmp = value - 1;
      await handleUpdateRecord(tmp);
    }
  };

  const handleUpdateRecord = async (value) => {
    if (value === 0) value = '';

    setValue(value);

    const field = getClassField(fldType);

    let currentReport = await UserS4Records.get(currentDate);

    if (!currentReport) {
      currentReport = await UserS4Records.initialize(currentDate);
    }

    currentReport[field] = +value;
    currentReport.changes = currentReport.changes.filter((record) => record.field !== field);
    currentReport.changes.push({ date: new Date(), field, value });

    await currentReport.save();
    setScreenRefresh((prev) => !prev);
  };

  useEffect(() => {
    const handleGetReportValue = async () => {
      const fldName = getClassField(fldType);

      const data = await UserS4Records.get(currentDate);
      if (data) {
        setValue(data[fldName] || '');
      }

      const currentS4 = await UserS4MonthlyReport.get(month);
      if (currentS4) setIsSubmitted(currentS4.isSubmitted);
    };

    setValue('');
    handleGetReportValue();
  }, [currentDate, fldType, month, screenRefresh]);

  return (
    <Box sx={{ margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '280px' }}>
      <Typography sx={{ lineHeight: 1.2, textAlign: 'center', fontSize: '13px', width: '200px', marginBottom: '5px' }}>
        {fldName}
      </Typography>

      <Box sx={{ display: 'flex', falignItems: 'center' }}>
        <IconButton aria-label="remove" color="warning" disabled={isSubmitted} onClick={handleDecreaseCount}>
          <RemoveCircleIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth={true}
            sx={{ '.MuiOutlinedInput-input': { textAlign: 'center', fontSize: '18px' } }}
            InputProps={{ readOnly: isSubmitted }}
            type="number"
            value={value}
            onChange={(e) => handleUpdateRecord(e.target.value)}
          />
        </Box>
        <IconButton aria-label="add" color="secondary" disabled={isSubmitted} onClick={handleIncreaseCount}>
          <AddCircleIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default S4GenericField;
