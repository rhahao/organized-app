import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { visitorIDState } from '@states/app';
import { setIsAccountChoose } from '@services/recoil/app';
import { handleUpdateSetting } from '@services/dexie/settings';

const useAccountChooser = () => {
  const visitorID = useRecoilValue(visitorIDState);

  const [tmpType, setTmpType] = useState('pocket');

  const handleChangeAccountType = (value) => {
    setTmpType(value);
  };

  const handleConfirmOption = async () => {
    await handleUpdateSetting({ account_type: tmpType });
    await setIsAccountChoose(false);
  };

  useEffect(() => {
    const updateSettings = async () => {
      await handleUpdateSetting({ account_type: 'pocket' });
    };

    updateSettings();
  }, []);

  return { visitorID, handleConfirmOption, handleChangeAccountType, tmpType };
};

export default useAccountChooser;
