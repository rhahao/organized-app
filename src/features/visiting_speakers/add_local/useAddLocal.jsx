import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { personsSearchableState } from '@states/persons';
import { personsFilter } from '@services/cpe/persons';
import { addVisitingSpeaker } from '@services/dexie/visitingSpeakers';
import { visitingSpeakersCongregationsState } from '@states/visitingSpeakers';
import { congNumberState } from '@states/settings';

const useAddLocal = () => {
  const activePersons = useRecoilValue(personsSearchableState);
  const congregations = useRecoilValue(visitingSpeakersCongregationsState);
  const congNumber = useRecoilValue(congNumberState);

  const [options, setOptions] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleAddVisitingSpeaker = async () => {
    await addVisitingSpeaker({ is_self: true, person_uid: selectedPerson.person_uid });
    setSelectedPerson(null);
  };

  useEffect(() => {
    const getOptions = async () => {
      const persons = await personsFilter(activePersons, { assTypes: [120] });
      const tmpOptions = [];
      const cong = congregations.find((record) => record.cong_number === +congNumber);

      let result = [];

      if (cong) {
        result = cong.cong_speakers
          .filter((record) => !record.is_deleted)
          .sort((a, b) => {
            return a.person_name > b.person_name ? 1 : -1;
          });
      }

      for (const speaker of persons) {
        const isVisitingSpeaker = result.find((record) => record.person_uid === speaker.person_uid);
        if (!isVisitingSpeaker) {
          tmpOptions.push(speaker);
        }
      }
      setOptions(tmpOptions);
    };

    getOptions();
  }, [activePersons, congNumber, congregations]);

  return { options, handleAddVisitingSpeaker, selectedPerson, setSelectedPerson };
};

export default useAddLocal;
