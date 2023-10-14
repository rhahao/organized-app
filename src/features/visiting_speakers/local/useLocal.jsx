import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { congNumberState, publicTalkCoordinatorRoleState } from '@states/settings';
import { visitingSpeakersCongregationsState } from '@states/visitingSpeakers';

const useLocal = () => {
  const [speakers, setSpeakers] = useState([]);

  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);
  const congregations = useRecoilValue(visitingSpeakersCongregationsState);
  const congNumber = useRecoilValue(congNumberState);

  useEffect(() => {
    const getLocalSpeakers = async () => {
      const cong = congregations.find((record) => record.cong_number === +congNumber);

      let result = [];

      if (cong) {
        result = cong.cong_speakers
          .filter((record) => !record.is_deleted)
          .sort((a, b) => {
            return a.person_name > b.person_name ? 1 : -1;
          });
      }

      setSpeakers(result);
    };

    getLocalSpeakers();
  }, [congNumber, congregations]);

  return { speakers, isEditor };
};

export default useLocal;
