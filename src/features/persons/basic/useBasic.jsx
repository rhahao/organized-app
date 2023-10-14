import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { generateDisplayName } from '@utils/common';
import { computeYearsDiff } from '@utils/date';
import { shortDatePickerFormatState } from '@states/app';
import { secretaryRoleState } from '@states/settings';

const useBasic = ({ setName, setDisplayName, setIsMale, setIsFemale, birthDate }) => {
  const shortDatePickerFormat = useRecoilValue(shortDatePickerFormatState);
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorDisplayName, setIsErrorDisplayName] = useState(false);
  const [age, setAge] = useState('');

  const handleNameChange = (name) => {
    setIsErrorName(false);
    setIsErrorDisplayName(false);
    if (name === '') {
      setIsErrorName(true);
      setIsErrorDisplayName(true);
    }
    setName(name);
    setDisplayName(generateDisplayName(name));
  };

  const handleDisplayNameChange = (name) => {
    setIsErrorDisplayName(false);
    if (name === '') {
      setIsErrorDisplayName(true);
    }
    setDisplayName(name);
  };

  const handleMaleCheck = (value) => {
    setIsMale(value);
    setIsFemale(!value);
  };

  const handleFemaleCheck = (value) => {
    setIsMale(!value);
    setIsFemale(value);
  };

  useEffect(() => {
    if (birthDate === null || birthDate.toString() === 'Invalid Date') {
      setAge('');
      return;
    }

    const age = computeYearsDiff(birthDate);
    setAge(age);
  }, [birthDate]);

  return {
    isErrorName,
    isErrorDisplayName,
    age,
    handleNameChange,
    handleDisplayNameChange,
    handleMaleCheck,
    handleFemaleCheck,
    shortDatePickerFormat,
    secretaryRole,
  };
};

export default useBasic;
