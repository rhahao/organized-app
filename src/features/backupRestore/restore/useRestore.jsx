import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  accountTypeState,
  coordinatorRoleState,
  lmmoRoleState,
  publicTalkCoordinatorRoleState,
  secretaryRoleState,
} from '@states/settings';
import { displaySnackNotification, setIsRestoreDb } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { apiFetchCongregationLastBackup, apiRestoreCongregationBackup } from '@services/api/congregation';
import { apiFetchUserLastBackup, apiRestoreUserBackup } from '@services/api/user';
import { restoreDbOpenState } from '@states/app';
import { useAppTranslation } from '@hooks/index';
import { formatDate } from '@services/dateformat';
import { dbRestoreCongregationBackup } from '@services/dexie/app';

const useRestore = () => {
  const { t } = useAppTranslation();

  const accountType = useRecoilValue(accountTypeState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const open = useRecoilValue(restoreDbOpenState);

  const [isProcessing, setIsProcessing] = useState(true);
  const [hasBackup, setHasBackup] = useState(false);
  const [backup, setBackup] = useState({});
  const [lastBackupDate, setLastBackupDate] = useState('');

  const hasCongBackupAccess = lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole;

  const shortDateTimeFormat = t('shortDateTimeFormat');
  const noBackupLabel = hasCongBackupAccess ? t('noBackupFound') : t('noUserBackupFound');

  const handleClose = async (event, reason) => {
    if (reason === 'clickaway' || reason === 'backdropClick') {
      return;
    }

    await setIsRestoreDb(false);
  };

  const fetchLastBackup = useCallback(async () => {
    try {
      setIsProcessing(true);

      let status, data;

      if (accountType === 'vip') {
        const result = await apiFetchCongregationLastBackup();
        status = result.status;
        data = result.data;
      }

      if (accountType === 'pocket') {
        const result = await apiFetchUserLastBackup();
        status = result.status;
        data = result.data;
      }

      if (status === 200) {
        let backupInfo;

        if (hasCongBackupAccess) {
          backupInfo = 'cong_last_backup';
        }

        if (!hasCongBackupAccess) {
          backupInfo = 'user_last_backup';
        }

        if (data[backupInfo] === 'NO_BACKUP') {
          setHasBackup(false);
          setIsProcessing(false);
        } else {
          setBackup(data[backupInfo]);
          setHasBackup(true);
          setIsProcessing(false);
        }
        return;
      }
    } catch (err) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  }, [accountType, hasCongBackupAccess]);

  const handleRestoreBackup = async () => {
    try {
      setIsProcessing(true);

      let status;
      let data;

      if (accountType === 'vip') {
        const result = await apiRestoreCongregationBackup();
        status = result.status;
        data = result.data;
      }

      if (accountType === 'pocket') {
        const result = await apiRestoreUserBackup();
        status = result.status;
        data = result.data;
      }

      if (status === 200) {
        await dbRestoreCongregationBackup(data);

        window.location.reload();
        return;
      }

      setIsProcessing(false);
      await setIsRestoreDb(false);

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'warning',
      });
    } catch (err) {
      setIsProcessing(false);
      await setIsRestoreDb(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    fetchLastBackup();
  }, [fetchLastBackup]);

  useEffect(() => {
    if (backup.by) {
      let info = '';

      if (hasCongBackupAccess) {
        info = t('restoreConfirmation', {
          backup_person: backup.by,
          backup_date: formatDate(new Date(backup.date), shortDateTimeFormat),
        });
      }

      if (!hasCongBackupAccess) {
        info = t('restoreUserConfirmation', {
          backup_person: backup.by,
          backup_date: formatDate(new Date(backup.date), shortDateTimeFormat),
        });
      }

      setLastBackupDate(info);
    }
  }, [backup, hasCongBackupAccess, shortDateTimeFormat, t]);

  return { isProcessing, hasBackup, handleClose, open, lastBackupDate, noBackupLabel, handleRestoreBackup };
};

export default useRestore;
