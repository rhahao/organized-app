import { useRecoilValue } from 'recoil';
import { shortDatePickerFormatState } from '@states/app';
import { secretaryRoleState } from '@states/settings';

const useServiceItem = ({ currentService, otherService, setOtherService }) => {
  const shortDatePickerFormat = useRecoilValue(shortDatePickerFormatState);
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const handleRemoveStatus = () => {
    const obj = otherService.filter((item) => item.serviceId !== currentService.serviceId);
    setOtherService(obj);
  };

  const handleInfoChange = (service, startDate, endDate) => {
    const obj = otherService.map((item) =>
      item.serviceId === currentService.serviceId
        ? {
            serviceId: currentService.serviceId,
            service,
            startDate: startDate,
            endDate: endDate,
          }
        : item
    );
    setOtherService(obj);
  };

  const handleStatusChange = (newValue) => {
    handleInfoChange(newValue, currentService.startDate, currentService.endDate);
  };

  const handleStartDateChange = (newValue) => {
    handleInfoChange(currentService.service, newValue, currentService.endDate);
  };

  const handleEndDateChange = (newValue) => {
    handleInfoChange(currentService.service, currentService.startDate, newValue);
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

export default useServiceItem;
