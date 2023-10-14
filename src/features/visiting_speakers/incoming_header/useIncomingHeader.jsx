import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { congAccountConnectedState } from '@states/app';
import { apiGetCongregationSpeakersList } from '@services/api/visitingSpeakers';
import { updateIncomingSpeakers } from '@services/dexie/visitingSpeakers';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { visitingSpeakersCongregationsState } from '@states/visitingSpeakers';
import { congNumberState } from '@states/settings';

const useIncomingHeader = () => {
  const congConnected = useRecoilValue(congAccountConnectedState);
  const congregations = useRecoilValue(visitingSpeakersCongregationsState);
  const congNumber = useRecoilValue(congNumberState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [congsList, setCongsList] = useState([]);

  const handleDownloadAllSpeakers = async () => {
    try {
      setIsProcessing(true);

      const { status, data } = await apiGetCongregationSpeakersList();
      if (status === 200) {
        await updateIncomingSpeakers(data);
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
    const congs = congregations
      .filter((record) => record.cong_number !== +congNumber)
      .sort((a, b) => {
        return a.cong_name > b.cong_name ? 1 : -1;
      });
    setCongsList(congs);
  }, [congregations, congNumber]);

  return { congConnected, isProcessing, congsList, handleDownloadAllSpeakers };
};

export default useIncomingHeader;
