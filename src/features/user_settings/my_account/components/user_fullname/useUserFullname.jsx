import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accountTypeState, usernameState } from '@states/settings';
import { apiUpdateUserFullname } from '@services/api/user';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { useAppTranslation, useFirebaseAuth } from '@hooks/index';
import { getMessageByCode } from '@services/i18n/translation';
import { handleUpdateSetting } from '@services/dexie/settings';
import { congAccountConnectedState } from '@states/app';

const useUserFullname = () => {
  const { t } = useAppTranslation();

  const accountType = useRecoilValue(accountTypeState);
  const username = useRecoilValue(usernameState);
  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  const [tmpUsername, setTempUsername] = useState(username);
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useFirebaseAuth();

  const handleCancelChanges = () => {
    setTempUsername(username);
  };

  const handleUpdateUsername = async () => {
    try {
      await setRootModalOpen(true);

      const { status, data } = await apiUpdateUserFullname(tmpUsername);

      if (status === 200) {
        await handleUpdateSetting({ username: tmpUsername });

        await displaySnackNotification({
          message: t('savedSuccess'),
          severity: 'success',
        });

        await setRootModalOpen(false);

        return;
      }

      await displaySnackNotification({
        message: getMessageByCode(data.message),
        severity: 'success',
      });

      await setRootModalOpen(false);
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });

      await setRootModalOpen(false);
    }
  };

  useEffect(() => {
    setIsEdit(tmpUsername !== username);
  }, [tmpUsername, username]);

  return {
    accountType,
    isEdit,
    handleCancelChanges,
    handleUpdateUsername,
    tmpUsername,
    setTempUsername,
    userEmail: user?.email || '',
    congAccountConnected,
  };
};

export default useUserFullname;
