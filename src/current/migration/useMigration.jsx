import { useEffect, useState } from 'react';
import Dexie from 'dexie';
import { useRecoilValue } from 'recoil';
import { appSnackOpenCPEState } from './states/main';
import appDb from './db';

const useMigration = () => {
  const appSnackOpen = useRecoilValue(appSnackOpenCPEState);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleCheckRole = async () => {
      const isDbExist = await Dexie.exists('cpe_sws');

      if (!isDbExist) return;

      const settings = await appDb.app_settings.get(1);
      setIsAdmin(!settings.cong_role.includes('admin'));
    };

    handleCheckRole();
  }, []);

  return { isAdmin, appSnackOpen };
};

export default useMigration;
