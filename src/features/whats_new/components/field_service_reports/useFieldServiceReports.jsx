import { useNavigate } from 'react-router-dom';
import { setWhatsNewOpen } from '@services/recoil/app';

const useFieldServiceReports = () => {
  const navigate = useNavigate();

  const openPending = () => {
    setWhatsNewOpen(false);
    navigate('/pending-field-service-reports');
  };

  return { openPending };
};

export default useFieldServiceReports;
