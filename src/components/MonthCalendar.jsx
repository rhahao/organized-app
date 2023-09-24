import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { isLightThemeState } from '../states/main';
import { getLastDate } from '../utils/date';
import { Setting } from '../classes/Setting';

const MonthCalendar = ({ month, marked = [], selectedDate }) => {
  const isLight = useRecoilValue(isLightThemeState);

  const [selected, setSelected] = useState(1);

  const minDate = new Date(month);
  const maxDate = getLastDate(month);

  const days = Setting.daysFirstLetter();
  const blankBlocks = Array.from({ length: minDate.getDay() === 0 ? 6 : minDate.getDay() - 1 }, (a, b) => b + 1);
  const dates = Array.from({ length: maxDate.getDate() }, (a, b) => b + 1);

  const handleKeyEvents = (e) => {
    switch (e.code) {
      case 'ArrowUp':
        if (selected !== null) {
          const newDate = +selected - 7;
          if (newDate >= 1) setSelected(newDate);
        }

        break;
      case 'ArrowDown':
        if (selected !== null) {
          const newDate = +selected + 7;
          if (newDate <= dates.length) setSelected(newDate);
        }

        break;
      case 'ArrowLeft':
        if (selected !== null) {
          const newDate = +selected - 1;
          if (newDate >= 1) setSelected(newDate);
        }

        break;
      case 'ArrowRight':
        if (selected !== null) {
          const newDate = +selected + 1;
          if (newDate <= dates.length) setSelected(newDate);
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (typeof selectedDate === 'function') selectedDate(selected);
  }, [selected, selectedDate]);

  return (
    <Paper
      elevation={3}
      sx={{ width: '296px', border: '1px outset', padding: '5px', boxSizing: 'content-box' }}
      onKeyDown={handleKeyEvents}
    >
      <Box sx={{ display: 'flex', gap: '2px' }}>
        {days.map((dayHeader, index) => (
          <Typography
            variant="subtitle2"
            align="center"
            key={`${dayHeader}-${index}`}
            sx={{
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              color: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(250, 250, 250, 0.7)',
            }}
          >
            {dayHeader}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: '2px', flexWrap: 'wrap', marginTop: '8px' }}>
        {blankBlocks.map((block) => (
          <Typography key={`block-${block}`} sx={{ width: '40px', height: '40px' }}></Typography>
        ))}
        {dates.map((date) => (
          <Button
            onClick={() => setSelected(date)}
            variant={selected === date ? 'contained' : 'inherit'}
            key={date}
            size="small"
            sx={{
              width: '40px',
              minWidth: '40px',
              height: '40px',
              borderRadius: '50%',
              position: 'relative',
              marginBottom: '5px',
            }}
          >
            {date}
            {marked && marked.includes(date) && (
              <span style={{ position: 'absolute', bottom: 17, right: -2, color: 'red' }}>
                <BookmarkIcon sx={{ fontSize: '15px' }} />
              </span>
            )}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default MonthCalendar;
