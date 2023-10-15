import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  autoBackupIntervalState,
  autoBackupState,
  coordinatorRoleState,
  elderRoleState,
  lmmoRoleState,
  msRoleState,
  publicTalkCoordinatorRoleState,
  publisherRoleState,
  secretaryRoleState,
} from '@states/settings';
import { handleUpdateSetting } from '@services/dexie/settings';
import { setIsDeleteDbOpen } from '@services/recoil/settings';

const useDataStorage = () => {
  const isAutoBackup = useRecoilValue(autoBackupState);
  const backupInterval = useRecoilValue(autoBackupIntervalState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const publisherRole = useRecoilValue(publisherRoleState);
  const msRole = useRecoilValue(msRoleState);
  const elderRole = useRecoilValue(elderRoleState);

  const [isTmpAutoBackup, setIsTmpAutoBackup] = useState(isAutoBackup);
  const [tmpBackupInterval, setTmpBackupInterval] = useState(backupInterval);

  const approvedRole =
    lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole || publisherRole || msRole || elderRole;

  const handleAutoBackupChange = async (value) => {
    setIsTmpAutoBackup(value);
    await handleUpdateSetting({ autoBackup: value });
  };

  const handleBackupIntervalChange = async (value) => {
    setTmpBackupInterval(value);
    await handleUpdateSetting({ autoBackup_interval: value });
  };

  const handleDelete = async () => {
    await setIsDeleteDbOpen(true);
  };

  return {
    isTmpAutoBackup,
    tmpBackupInterval,
    approvedRole,
    handleAutoBackupChange,
    handleBackupIntervalChange,
    handleDelete,
  };
};

export default useDataStorage;
