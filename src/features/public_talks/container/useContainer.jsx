import { useRecoilValue } from 'recoil';
import { publicTalksLocaleState } from '@states/publicTalks';

const useContainer = () => {
  const publicTalks = useRecoilValue(publicTalksLocaleState);

  return { publicTalks };
};

export default useContainer;
