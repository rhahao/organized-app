import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { apiGetApprovedVisitingSpeakersAccess, apiUpdateVisitingSpeakersAccess } from '@services/api/visitingSpeakers';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { publicTalkCoordinatorRoleState } from '@states/settings';

const useLocalAccess = ({ speakersAccessOpen }) => {
  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);

  const [isProcessing, setIsProcessing] = useState(true);
  const [options, setOptions] = useState([]);

  const fetchData = useCallback(async () => {
    setIsProcessing(true);
    const { status, data } = await apiGetApprovedVisitingSpeakersAccess();
    if (status === 200) setOptions(data);
    setIsProcessing(false);
  }, []);

  const handleChange = async (value) => {
    try {
      setIsProcessing(true);
      const { status, data } = await apiUpdateVisitingSpeakersAccess(value);
      if (status === 200) {
        setOptions(data);
      }
      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (speakersAccessOpen) {
      fetchData();
    }
  }, [fetchData, speakersAccessOpen]);

  return { isEditor, isProcessing, options, handleChange };
};

export default useLocalAccess;
