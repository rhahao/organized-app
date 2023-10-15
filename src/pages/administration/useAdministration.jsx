import { useRecoilValue } from 'recoil';
import { isCongPersonAddState } from '@states/app';

const useAdministration = () => {
  const isCongPersonAdd = useRecoilValue(isCongPersonAddState);

  return { isCongPersonAdd };
};

export default useAdministration;
