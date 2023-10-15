import { useRecoilValue } from 'recoil';
import { accountTypeState } from '@states/settings';
import { congAccountConnectedState } from '@states/app';

const useUserSettings = () => {
  const accountType = useRecoilValue(accountTypeState);
  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  return { accountType, congAccountConnected };
};

export default useUserSettings;
