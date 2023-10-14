import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAppointmentItem from './components/appointment_item';
import useAppointment from './useAppointment';
import { useAppTranslation } from '@hooks/index';

const PersonAppointment = ({ isFemale, spiritualStatus, setSpiritualStatus }) => {
  const { t } = useAppTranslation();

  const { handleAppointmentAdd, secretaryRole, sortedStatus } = useAppointment({ spiritualStatus, setSpiritualStatus });

  return (
    <Box id="spiritualStatus-container">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '20px',
        }}
      >
        {secretaryRole && (
          <Button variant="outlined" color="success" startIcon={<AddCircleIcon />} onClick={handleAppointmentAdd}>
            {t('newSpiritualStatus')}
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {spiritualStatus?.length > 0 &&
          sortedStatus.map((item) => (
            <PersonAppointmentItem
              key={item.statusId}
              isFemale={isFemale}
              currentStatus={item}
              spiritualStatus={sortedStatus}
              setSpiritualStatus={(value) => setSpiritualStatus(value)}
            />
          ))}
      </Box>
    </Box>
  );
};

PersonAppointment.propTypes = {
  isFemale: PropTypes.bool,
  spiritualStatus: PropTypes.arrayOf(PropTypes.object),
  setSpiritualStatus: PropTypes.func,
};

export default PersonAppointment;
