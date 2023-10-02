import { useRecoilValue } from 'recoil';
import { acknowledgeRequestApproval } from '@services/dexie/visitingSpeakers';
import { displaySnackNotification } from '@services/recoil/app';
import { congSpeakersRequestsUpdateState } from '@states/app';

const useApproved = () => {
  const speakersRequests = useRecoilValue(congSpeakersRequestsUpdateState);

  const handleAcknowledge = async (cong_number) => {
    try {
      await acknowledgeRequestApproval(cong_number);
    } catch (err) {
      await displaySnackNotification({
        message: err.message,
        severity: 'error',
      });
    }
  };

  return { speakersRequests, handleAcknowledge };
};

export default useApproved;
