import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonTimeAwayItem from './components/time_away_item';
import { useAppTranslation } from '@hooks/index';
import useTimeAway from './useTimeAway';

const PersonTimeAway = ({ timeAway, setTimeAway }) => {
  const { t } = useAppTranslation();

  const { handleTimeAwayAdd, isEditAllowed } = useTimeAway({ timeAway, setTimeAway });

  return (
    <Box id="time-away-container">
      {isEditAllowed && (
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddCircleIcon />}
          onClick={handleTimeAwayAdd}
          sx={{ marginBottom: '20px' }}
        >
          {t('addTimeAway')}
        </Button>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {timeAway?.length > 0 &&
          timeAway.map((item) => (
            <PersonTimeAwayItem
              key={item.timeAwayId}
              timeAway={item}
              timeAways={timeAway}
              setTimeAway={(value) => setTimeAway(value)}
            />
          ))}
      </Box>
    </Box>
  );
};

PersonTimeAway.propTypes = {
  timeAway: PropTypes.arrayOf(PropTypes.object),
  setTimeAway: PropTypes.func,
};

export default PersonTimeAway;
