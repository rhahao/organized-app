import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MonthCalendar from '../components/MonthCalendar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ServiceYear } from '../classes/ServiceYear';
import { S4DailyRecord, UserS4 } from '../features/userFieldServiceReports';
import { UserS4MonthlyReport } from '../classes/UserS4MonthlyReport';
import { UserS4Records } from '../classes/UserS4Records';
import { refreshScreenState } from '../states/main';
import { formatDateFull } from '../utils/date';

const UserFieldServiceReport = () => {
  const { t } = useTranslation('ui');

  const screenRefresh = useRecoilValue(refreshScreenState);

  const [currentServiceYear, setCurrentServiceYear] = useState(
    ServiceYear.getByMonth(ServiceYear.currentReportMonth()).uid
  );
  const [currentMonth, setCurrentMonth] = useState('');
  const [allMonths, setAllMonths] = useState([]);
  const [datesMarked, setDatesMarked] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceYearChange = (value) => {
    setCurrentServiceYear(value);
  };

  const handleMonthChange = (value) => {
    setCurrentMonth(value);
  };

  const handleDateSelected = async (value) => {
    const date = String(value).padStart(2, '0');
    const month = currentMonth.split('/')[1];
    const year = currentMonth.split('/')[0];

    const tmpDate = `${year}/${month}/${date}`;
    setSelectedDate(tmpDate);
  };

  useEffect(() => {
    if (currentServiceYear !== '') {
      const options = ServiceYear.getMonths(currentServiceYear);
      setAllMonths(options);

      if (currentServiceYear === ServiceYear.getByMonth(ServiceYear.currentReportMonth()).uid) {
        let currentMonth;

        if (new Date().getDate() > 20) {
          currentMonth = new Date().getMonth();
        } else {
          currentMonth = new Date().getMonth() - 1;
        }
        if (currentMonth < 0) currentMonth = 0;
        const selected = options.find((option) => option.index === currentMonth);

        setCurrentMonth(selected.value);
      } else {
        setCurrentMonth(options[0].value);
      }
    }
  }, [currentServiceYear]);

  useEffect(() => {
    const initializeMonth = async () => {
      let currentS4 = UserS4MonthlyReport.get(currentMonth);

      if (!currentS4) {
        currentS4 = await UserS4MonthlyReport.initialize(currentMonth);
      }

      setIsSubmitted(currentS4.isSubmitted);

      const tmpMarked = [];
      for (const report of currentS4.reports) {
        const isNull = report.null();
        if (!isNull) {
          tmpMarked.push(+report.month_date.split('/')[2]);
        }
      }

      setDatesMarked(tmpMarked);
    };

    if (currentMonth !== '') {
      initializeMonth();
    }
  }, [currentMonth, screenRefresh]);

  return (
    <Box>
      <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '20px' }}>
        {t('fieldServiceReport')}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <TextField
          id="outlined-select-service-year"
          select
          label={t('serviceYear')}
          size="small"
          sx={{ minWidth: '200px' }}
          value={currentServiceYear}
          onChange={(e) => handleServiceYearChange(e.target.value)}
        >
          {ServiceYear.list.map((year) => (
            <MenuItem key={year.uid} value={year.uid}>
              {year.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-month"
          select
          label={t('selectMonth')}
          size="small"
          sx={{ minWidth: '250px' }}
          value={currentMonth}
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          {allMonths.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <UserS4 month={currentMonth} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        <MonthCalendar
          month={currentMonth}
          marked={datesMarked}
          disableUnmarked={isSubmitted}
          selectedDate={(value) => handleDateSelected(value)}
          initialSelected={isSubmitted ? +datesMarked[0] : undefined}
        />
        {selectedDate !== null && (
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>{formatDateFull(selectedDate)}</Typography>
            <S4DailyRecord month={currentMonth} date={selectedDate} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserFieldServiceReport;
