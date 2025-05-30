import { ChangeEvent, useCallback, useState } from 'react';
import { useAtomValue } from 'jotai';
import { isMFAEnabledState } from '@states/app';
import { accountTypeState } from '@states/settings';

const useSecurity = () => {
  const isMFAEnabled = useAtomValue(isMFAEnabledState);
  const accountType = useAtomValue(accountTypeState);

  const [isOpenMFAEnable, setIsOpenMFAEnable] = useState(false);
  const [isOpenMFADisable, setIsOpenMFADisable] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);

  const handleToggleMFA = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!isMFAEnabled) {
      setIsOpenMFAEnable(true);
    }

    if (isMFAEnabled) {
      setIsOpenMFADisable(true);
    }
  };

  const handleCloseDialog = useCallback(() => {
    setIsOpenMFAEnable(false);
    setIsOpenMFADisable(false);
  }, []);

  const handleOpenDelete = () => setIsAccountDelete(true);

  const handleCloseDelete = () => setIsAccountDelete(false);

  return {
    isMFAEnabled,
    handleToggleMFA,
    isOpenMFAEnable,
    isOpenMFADisable,
    handleCloseDialog,
    accountType,
    isAccountDelete,
    handleOpenDelete,
    handleCloseDelete,
  };
};

export default useSecurity;
