import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { themeOptionsState } from '@states/app';
import { setIsAccountChoose, setShowTermsUse } from '@services/recoil/app';
import { handleUpdateSetting } from '@services/dexie/settings';

const useTermsUse = () => {
  const themeOptions = useRecoilValue(themeOptionsState);

  const [readComplete, setReadComplete] = useState(false);

  const handleTermsUse = () => {
    localStorage.setItem('termsUse', false);
    setShowTermsUse(false);
  };

  const handleReturnChooser = async () => {
    await handleUpdateSetting({ account_type: '' });
    setShowTermsUse(false);
    setIsAccountChoose(true);
  };

  return { themeOptions, handleTermsUse, handleReturnChooser, readComplete, setReadComplete };
};

export default useTermsUse;
