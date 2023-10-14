import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { congAccountConnectedState } from '@states/app';
import { publicTalkCoordinatorRoleState } from '@states/settings';
import { displaySnackNotification } from '@services/recoil/app';
import { dbExportTable } from '@services/dexie/app';
import { apiGetCongregationSpeakersList, apiUploadVisitingSpeakers } from '@services/api/visitingSpeakers';
import { useAppTranslation } from '@hooks/index';
import { deleteCongregation, updateIncomingSpeakers } from '@services/dexie/visitingSpeakers';
import { getMessageByCode } from '@services/i18n/translation';

const useHeader = ({ cong }) => {
  const { t } = useAppTranslation();

  const congConnected = useRecoilValue(congAccountConnectedState);
  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);

  const [isProcessing, setIsProcessing] = useState(false);

  const requestDispproved = cong.request_status === 'disapproved';
  const requestPending = cong.request_status === 'pending';

  const handleShareSpeakers = async (e) => {
    try {
      e.stopPropagation();

      setIsProcessing(true);

      const data = await dbExportTable('visiting_speakers');
      const { status } = await apiUploadVisitingSpeakers(data);

      if (status === 200) {
        await displaySnackNotification({
          message: t('congrationOutgoingSpeakersShared'),
          severity: 'success',
        });
      }

      if (status !== 200) {
        await displaySnackNotification({
          message: t('congrationOutgoingSpeakersShareError'),
          severity: 'warning',
        });
      }

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: error.message,
        severity: 'error',
      });
    }
  };

  const handleDownloadSpeakers = async (e) => {
    try {
      e.stopPropagation();

      setIsProcessing(true);

      const { status, data } = await apiGetCongregationSpeakersList(cong.cong_id);
      if (status === 200) {
        await updateIncomingSpeakers(data);
      } else {
        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });
      }

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: error.message,
        severity: 'error',
      });
    }
  };

  const handleDeleteCongregation = async (e) => {
    try {
      e.stopPropagation();

      setIsProcessing(true);

      await deleteCongregation(cong.cong_number);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: error.message,
        severity: 'error',
      });
    }
  };

  return {
    isProcessing,
    congConnected,
    isEditor,
    requestDispproved,
    requestPending,
    handleShareSpeakers,
    handleDownloadSpeakers,
    handleDeleteCongregation,
  };
};

export default useHeader;
