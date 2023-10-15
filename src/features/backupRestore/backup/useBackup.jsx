import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  accountTypeState,
  coordinatorRoleState,
  elderRoleState,
  lmmoRoleState,
  msRoleState,
  publicTalkCoordinatorRoleState,
  publisherRoleState,
  secretaryRoleState,
} from '@states/settings';
import { displaySnackNotification, setIsBackupDb } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { apiFetchCongregationLastBackup, apiSendCongregationBackup } from '@services/api/congregation';
import { apiFetchUserLastBackup, apiSendUserBackup } from '@services/api/user';
import { backupDbOpenState } from '@states/app';
import { useAppTranslation } from '@hooks/index';
import { formatDate } from '@services/dateformat';
import { dbExportDataOnline } from '@services/dexie/app';
import { cleanLateReportsDeleted } from '@services/dexie/lateReports';
import { cleanMinutesReportsDeleted } from '@services/dexie/minutesReports';
import { cleanFieldServiceGroupDeleted } from '@services/dexie/fieldServiceGroup';
import { cleanUserBibleStudiesDeleted } from '@services/dexie/userBibleStudies';
import { cleanUserFieldServiceReportsDeleted } from '@services/dexie/userFieldSericeReports';

const useBackup = () => {
  const { t } = useAppTranslation();

  const accountType = useRecoilValue(accountTypeState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const publisherRole = useRecoilValue(publisherRoleState);
  const elderRole = useRecoilValue(elderRoleState);
  const msRole = useRecoilValue(msRoleState);
  const open = useRecoilValue(backupDbOpenState);

  const weekendEditorRole = coordinatorRole || publicTalkCoordinatorRole;
  const localPublisherRole = publisherRole || msRole || elderRole;

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

    await setIsBackupDb(false);
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

  const handleCreateBackup = async () => {
    try {
      setIsProcessing(true);

      const dbData = await dbExportDataOnline();

      const reqPayload = {
        cong_persons: dbData.dbPersons,
        cong_deleted: dbData.dbDeleted,
        cong_settings: dbData.dbSettings,
        cong_schedule: lmmoRole || weekendEditorRole ? dbData.dbSchedule : undefined,
        cong_sourceMaterial: lmmoRole || weekendEditorRole ? dbData.dbSourceMaterial : undefined,
        cong_branchReports: secretaryRole ? dbData.dbBranchReportsTbl : undefined,
        cong_fieldServiceGroup: secretaryRole ? dbData.dbFieldServiceGroupTbl : undefined,
        cong_fieldServiceReports: secretaryRole ? dbData.dbFieldServiceReportsTbl : undefined,
        cong_lateReports: secretaryRole ? dbData.dbLateReportsTbl : undefined,
        cong_meetingAttendance: secretaryRole ? dbData.dbMeetingAttendanceTbl : undefined,
        cong_minutesReports: secretaryRole ? dbData.dbMinutesReportsTbl : undefined,
        cong_publicTalks: publicTalkCoordinatorRole ? dbData.dbPublicTalks : undefined,
        cong_visitingSpeakers: publicTalkCoordinatorRole ? dbData.dbVisitingSpeakers : undefined,
        cong_serviceYear: secretaryRole ? dbData.dbServiceYearTbl : undefined,
        user_bibleStudies: localPublisherRole ? dbData.dbUserBibleStudiesTbl : undefined,
        user_fieldServiceReports: localPublisherRole ? dbData.dbUserFieldServiceReportsTbl : undefined,
      };

      let status;
      let data;

      if (accountType === 'vip') {
        const result = await apiSendCongregationBackup(reqPayload);
        status = result.status;
        data = result.data;
      }

      if (accountType === 'pocket') {
        const result = await apiSendUserBackup(reqPayload);
        status = result.status;
        data = result.data;
      }

      if (status === 200) {
        if (secretaryRole) {
          await cleanLateReportsDeleted();
          await cleanMinutesReportsDeleted();
          await cleanFieldServiceGroupDeleted();
        }

        if (localPublisherRole) {
          await cleanUserBibleStudiesDeleted();
          await cleanUserFieldServiceReportsDeleted();
        }

        await displaySnackNotification({
          message: t('backupSuccess'),
          severity: 'success',
        });

        await setIsBackupDb(false);

        return;
      }

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'error',
      });

      await setIsBackupDb(false);
    } catch (err) {
      setIsProcessing(false);
      await setIsBackupDb(false);

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
        info = t('lastCongBackup', {
          backup_person: backup.by,
          backup_date: formatDate(new Date(backup.date), shortDateTimeFormat),
        });
      }

      if (!hasCongBackupAccess) {
        info = t('lastUserBackup', {
          backup_person: backup.by,
          backup_date: formatDate(new Date(backup.date), shortDateTimeFormat),
        });
      }

      setLastBackupDate(info);
    }
  }, [backup, hasCongBackupAccess, shortDateTimeFormat, t]);

  return { isProcessing, hasBackup, handleClose, open, lastBackupDate, noBackupLabel, handleCreateBackup };
};

export default useBackup;
