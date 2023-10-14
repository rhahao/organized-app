import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { publicTalkCoordinatorRoleState } from '@states/settings';
import { visitingSpeakersCongregationsState } from '@states/visitingSpeakers';

const useIncomingSpeakers = ({ cong }) => {
  const [speakers, setSpeakers] = useState([]);

  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);
  const congregations = useRecoilValue(visitingSpeakersCongregationsState);

  useEffect(() => {
    const currentCong = congregations.find((record) => record.cong_number === +cong.cong_number);
    let result = [];

    if (cong) {
      result = currentCong.cong_speakers
        .filter((record) => !record.is_deleted)
        .sort((a, b) => {
          return a.person_name > b.person_name ? 1 : -1;
        });
    }
    setSpeakers(result);
  }, [cong, congregations]);

  return { speakers, isEditor };
};

export default useIncomingSpeakers;
