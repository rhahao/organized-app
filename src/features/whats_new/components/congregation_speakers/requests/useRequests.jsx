import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { congSpeakersRequestsState } from '@states/app';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import {
  apiApproveCongregationSpeakersRequest,
  apiDisapproveCongregationSpeakersRequest,
  apiGetCongregationSpeakersRequests,
} from '@services/api/visitingSpeakers';

const useRequests = () => {
  const queryClient = useQueryClient();

  const speakersRequests = useRecoilValue(congSpeakersRequestsState);

  const handleApprove = async (cong_id) => {
    try {
      const { status } = await apiApproveCongregationSpeakersRequest(cong_id);
      if (status === 200) {
        await queryClient.prefetchQuery({
          queryKey: ['congregationSpeakersRequests'],
          queryFn: apiGetCongregationSpeakersRequests,
        });
      }
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  const handleDisapprove = async (cong_id) => {
    try {
      const { status } = await apiDisapproveCongregationSpeakersRequest(cong_id);
      if (status === 200) {
        await queryClient.prefetchQuery({
          queryKey: ['congregationSpeakersRequests'],
          queryFn: apiGetCongregationSpeakersRequests,
        });
      }
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  return { speakersRequests, handleApprove, handleDisapprove };
};

export default useRequests;
