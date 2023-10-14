import { useRecoilValue } from 'recoil';
import { secretaryRoleState } from '@states/settings';

const useServices = ({ otherService, setOtherService }) => {
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const sortedService = otherService.sort((a, b) => {
    return a.startDate < b.startDate ? 1 : -1;
  });

  const handleAppointmentAdd = () => {
    const obj = {
      serviceId: window.crypto.randomUUID(),
      service: 'auxiliaryPioneer',
      startDate: new Date(),
      endDate: null,
    };
    setOtherService([obj, ...otherService]);
  };

  return { secretaryRole, sortedService, handleAppointmentAdd };
};

export default useServices;
