import { useRecoilValue } from 'recoil';
import { secretaryRoleState } from '@states/settings';

const useAppointment = ({ spiritualStatus, setSpiritualStatus }) => {
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const sortedStatus = spiritualStatus.sort((a, b) => {
    return a.startDate < b.startDate ? 1 : -1;
  });

  const handleAppointmentAdd = () => {
    const obj = {
      statusId: window.crypto.randomUUID(),
      status: 'publisher',
      startDate: new Date(),
      endDate: null,
    };
    setSpiritualStatus([obj, ...spiritualStatus]);
  };

  return { secretaryRole, sortedStatus, handleAppointmentAdd };
};

export default useAppointment;
