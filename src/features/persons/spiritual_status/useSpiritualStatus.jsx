import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { shortDatePickerFormatState } from '@states/app';
import { lmmoRoleState, secretaryRoleState } from '@states/settings';
import { computeYearsDiff } from '@utils/date';

const useSpiritualStatus = ({
  setIsBaptized,
  immersedDate,
  setImmersedDate,
  setIsOtherSheep,
  setIsAnointed,
  setFirstMonthReport,
}) => {
  const shortDatePickerFormat = useRecoilValue(shortDatePickerFormatState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const [baptizedYears, setBaptizedYears] = useState('');

  const isEditAllowed = lmmoRole || secretaryRole;

  const handleBaptizedCheck = (value) => {
    setIsBaptized(value);
    if (!value) {
      setImmersedDate(null);
    }
  };

  const handleOtherSheepCheck = (value) => {
    setIsOtherSheep(value);
    setIsAnointed(!value);
  };

  const handleAnointedCheck = (value) => {
    setIsAnointed(value);
    setIsOtherSheep(!value);
  };

  const handleFirstMonthReport = (value) => {
    setFirstMonthReport(value);
    if (value !== null) {
      setTimeout(() => {
        const date = new Date(value);
        value = new Date(date.getFullYear(), date.getMonth(), 1);
        setFirstMonthReport(value);
      }, 1000);
    }
  };

  useEffect(() => {
    if (immersedDate === null) {
      setBaptizedYears('');
      return;
    }

    const years = computeYearsDiff(immersedDate);
    setBaptizedYears(years);
  }, [immersedDate]);

  return {
    shortDatePickerFormat,
    baptizedYears,
    isEditAllowed,
    handleBaptizedCheck,
    handleOtherSheepCheck,
    handleAnointedCheck,
    handleFirstMonthReport,
    secretaryRole,
  };
};

export default useSpiritualStatus;
