import { useRecoilValue } from 'recoil';
import { shortDatePickerFormatState } from '@states/app';
import { secretaryRoleState } from '@states/settings';

const useAppointmentItem = ({ currentStatus, spiritualStatus, setSpiritualStatus }) => {
  const shortDatePickerFormat = useRecoilValue(shortDatePickerFormatState);
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const handleRemoveStatus = () => {
    const obj = spiritualStatus.filter((item) => item.statusId !== currentStatus.statusId);
    setSpiritualStatus(obj);
  };

  const handleInfoChange = (status, startDate, endDate) => {
    const obj = spiritualStatus.map((item) =>
      item.statusId === currentStatus.statusId
        ? {
            statusId: currentStatus.statusId,
            status,
            startDate: startDate,
            endDate: endDate,
          }
        : item
    );
    setSpiritualStatus(obj);
  };

  const handleStatusChange = (newValue) => {
    handleInfoChange(newValue, currentStatus.startDate, currentStatus.endDate);
  };

  const handleStartDateChange = (newValue) => {
    handleInfoChange(currentStatus.status, newValue, currentStatus.endDate);
  };

  const handleEndDateChange = (newValue) => {
    handleInfoChange(currentStatus.status, currentStatus.startDate, newValue);
  };

  return {
    shortDatePickerFormat,
    secretaryRole,
    handleRemoveStatus,
    handleStatusChange,
    handleStartDateChange,
    handleEndDateChange,
  };
};

export default useAppointmentItem;
