import { useRecoilValue } from 'recoil';
import { personEditorRoleState } from '@states/settings';

const useTimeAway = ({ timeAway, setTimeAway }) => {
  const isEditAllowed = useRecoilValue(personEditorRoleState);

  const handleTimeAwayAdd = () => {
    const obj = {
      timeAwayId: window.crypto.randomUUID(),
      startDate: new Date(),
      endDate: null,
      comments: '',
    };
    setTimeAway([obj, ...timeAway]);
  };

  return { isEditAllowed, handleTimeAwayAdd };
};

export default useTimeAway;
