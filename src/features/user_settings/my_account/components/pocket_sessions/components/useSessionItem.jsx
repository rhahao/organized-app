import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { apiDeletePocketDevice, apiFetchPocketSessions } from '@services/api/user';
import { getMessageByCode } from '@services/i18n/translation';
import { formatDate } from '@services/dateformat';
import { useAppTranslation } from '@hooks/index';
import { visitorIDState } from '@states/app';

const useSessionItem = ({ device }) => {
  const { t } = useAppTranslation();

  const queryClient = useQueryClient();

  const visitorID = useRecoilValue(visitorIDState);

  const isSelf = visitorID === device.visitorid;

  const formatLastSeen = (last_seen) => {
    return last_seen ? formatDate(new Date(last_seen), t('shortDateTimeFormat')) : '';
  };

  const deviceLastSeen = formatLastSeen(device.sws_last_seen);

  const handleDeleteDevice = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiDeletePocketDevice(device.visitorid);

      if (status === 200) {
        await queryClient.prefetchQuery({ queryKey: ['devices'], queryFn: apiFetchPocketSessions });

        await displaySnackNotification({ message: getMessageByCode('DEVICE_REMOVED'), severity: 'success' });
      } else {
        await displaySnackNotification({ message: getMessageByCode(data.message), severity: 'warning' });
      }

      await setRootModalOpen(false);
    } catch (err) {
      await setRootModalOpen(false);

      await displaySnackNotification({ message: getMessageByCode(err.message), severity: 'error' });
    }
  };

  return { handleDeleteDevice, deviceLastSeen, isSelf };
};

export default useSessionItem;
