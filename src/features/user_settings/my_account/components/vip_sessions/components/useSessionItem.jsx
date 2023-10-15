import { useRecoilValue } from 'recoil';
import { apiRevokeVIPSession } from '@services/api/user';
import { formatDate } from '@services/dateformat';
import { getMessageByCode } from '@services/i18n/translation';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { visitorIDState } from '@states/app';
import { useAppTranslation } from '@hooks/index';

const useSessionItem = ({ session, setSessions }) => {
  const { t } = useAppTranslation();

  const visitorID = useRecoilValue(visitorIDState);

  const lastSeen = session.last_seen ? formatDate(new Date(session.last_seen), t('shortDateTimeFormat')) : '';
  const isSelf = visitorID === session.visitorid;

  const handleRevokeSession = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiRevokeVIPSession(session.visitorid);

      if (status === 200) {
        setSessions(data);
        await setRootModalOpen(false);
        return;
      }

      await setRootModalOpen(false);
      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'error',
      });
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  return { handleRevokeSession, lastSeen, isSelf };
};

export default useSessionItem;
