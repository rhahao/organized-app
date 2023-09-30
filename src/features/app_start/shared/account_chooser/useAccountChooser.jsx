import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { visitorIDState } from '@states/app';
import { setIsAccountChoose } from '@services/dexie/app';
import { handleUpdateSetting } from '@services/dexie/settings';

const useAccountChooser = () => {
  const visitorID = useRecoilValue(visitorIDState);

  const handleChangeAccountType = async (value) => {
    await handleUpdateSetting({ account_type: value });
  };

  const handleConfirmOption = async () => {
    await setIsAccountChoose(false);
  };

  useEffect(() => {
    const updateSettings = async () => {
      await handleUpdateSetting({ account_type: 'pocket' });
    };

    updateSettings();
  }, []);

  return { visitorID, handleConfirmOption, handleChangeAccountType };
};

export default useAccountChooser;
