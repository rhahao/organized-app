import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isAccountChooseState, isSetupState, isUnauthorizedRoleState } from '@states/app';
import { accountTypeState } from '@states/settings';
import { setIsAccountChoose } from '@services/dexie/app';

const useStartup = () => {
  const isUnauthorizedRole = useRecoilValue(isUnauthorizedRoleState);
  const isSetup = useRecoilValue(isSetupState);
  const accountType = useRecoilValue(accountTypeState);
  const isAccountChoose = useRecoilValue(isAccountChooseState);

  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const checkAccount = async () => {
      if (accountType !== '') {
        await setIsAccountChoose(false);
        setIsAuth(false);
        return;
      }

      await setIsAccountChoose(true);
      setIsAuth(false);
    };

    checkAccount();
  }, [accountType]);

  return { isUnauthorizedRole, isSetup, isAuth, isAccountChoose };
};

export default useStartup;
