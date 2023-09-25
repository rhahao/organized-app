import Box from '@mui/material/Box';
import S4BibleStudiesField from './S4BibleStudiesField';
import S4GenericField from './S4GenericField';
import S4HourField from './S4HourField';

const S4DailyRecord = ({ date, month }) => {
  return (
    <Box sx={{ marginTop: '15px' }}>
      <S4GenericField currentDate={date} month={month} fldType="S4Placements" />
      <S4GenericField currentDate={date} month={month} fldType="S4Video" />
      <S4HourField currentDate={date} month={month} />
      <S4GenericField currentDate={date} month={month} fldType="S4ReturnVisits" />
      <S4BibleStudiesField currentDate={date} month={month} />
    </Box>
  );
};

export default S4DailyRecord;
