import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { congAccountConnectedState } from '@states/app';
import { getCongregation } from '@services/cpe/visitingSpeakers';
import { displaySnackNotification } from '@services/recoil/app';
import { useAppTranslation } from '@hooks/index';
import { apiFindCongregationSpeakers, apiRequestAccessCongregationSpeakers } from '@services/api/visitingSpeakers';
import { createCongregation } from '@services/dexie/visitingSpeakers';
import { getMessageByCode } from '@services/i18n/translation';

const useCongregationAdd = ({ setOpen }) => {
  const { t } = useAppTranslation();

  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  const [congName, setCongName] = useState('');
  const [congNumber, setCongNumber] = useState('');
  const [isSync, setIsSync] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedCong, setSelectedCong] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState('');

  const handleSelectCong = (value) => {
    setSelectedCong(value);
    setIsSync(value !== null);
  };

  const handleClose = () => {
    setCongName('');
    setCongNumber('');
    setSelectedCong(null);
    setOpen(false);
  };

  const handleCreateCongreation = async () => {
    try {
      // check if cong exist
      const tmpNumber = selectedCong?.cong_number || congNumber;
      const isExist = await getCongregation(tmpNumber);

      if (isExist) {
        await displaySnackNotification({
          message: t('congregationExists'),
          severity: 'warning',
        });
        return;
      }

      if (selectedCong !== null) {
        const { status } = await apiRequestAccessCongregationSpeakers(selectedCong.cong_id);
        if (status !== 200) {
          await displaySnackNotification({
            message: t('visitingSpeakersRequestError'),
            severity: 'warning',
          });
          return;
        }
      }

      const obj = {
        cong_id: selectedCong === null ? undefined : selectedCong.cong_id,
        cong_name: selectedCong === null ? congName : selectedCong.cong_name,
        cong_number: selectedCong === null ? congNumber : selectedCong.cong_number,
      };

      await createCongregation(obj);

      handleClose();
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    let active = true;
    let fetchTimer;

    try {
      if (inputValue.length < 2) {
        setOptions(selectedCong ? [selectedCong] : []);
        return undefined;
      }

      const fetchCongregations = async (name) => {
        try {
          setIsSearching(true);
          const { status, data } = await apiFindCongregationSpeakers(name);
          if (status === 200) {
            if (active) {
              setOptions(data);
            }
          }
          setIsSearching(false);
        } catch (err) {
          setIsSearching(false);
          throw new Error(err);
        }
      };

      const testValue = selectedCong ? `(${selectedCong.cong_number}) ${selectedCong.cong_name}` : '';
      if (inputValue !== testValue) {
        fetchTimer = setTimeout(() => {
          fetchCongregations(inputValue);
        }, 2000);
      }
    } catch (err) {
      setIsSearching(false);
    }

    return () => {
      active = false;
      if (fetchTimer) clearTimeout(fetchTimer);
    };
  }, [inputValue, selectedCong]);

  return {
    congAccountConnected,
    congName,
    congNumber,
    isSync,
    options,
    selectedCong,
    setInputValue,
    isSearching,
    handleSelectCong,
    handleCreateCongreation,
    setCongName,
    setCongNumber,
    handleClose,
  };
};

export default useCongregationAdd;
