import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonServiceItem from './components/service_item';
import useServices from './useServices';
import { useAppTranslation } from '@hooks/index';

const PersonServices = ({ otherService, setOtherService }) => {
  const { t } = useAppTranslation();

  const { handleAppointmentAdd, secretaryRole, sortedService } = useServices({ otherService, setOtherService });

  return (
    <Box id="other-service-container">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '20px',
        }}
      >
        {secretaryRole && (
          <Button variant="outlined" color="success" startIcon={<AddCircleIcon />} onClick={handleAppointmentAdd}>
            {t('add')}
          </Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {otherService?.length > 0 &&
          sortedService.map((item) => (
            <PersonServiceItem
              key={item.serviceId}
              currentService={item}
              otherService={sortedService}
              setOtherService={(value) => setOtherService(value)}
            />
          ))}
      </Box>
    </Box>
  );
};

PersonServices.propTypes = {
  otherService: PropTypes.arrayOf(PropTypes.object),
  setOtherService: PropTypes.func,
};

export default PersonServices;
