import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { publicTalkCoordinatorRoleState } from '@states/settings';
import { updateSpeakerTalks } from '@services/dexie/visitingSpeakers';
import { publicTalksLocale } from '@services/cpe/publicTalks';

const useSpeakerTalks = ({ speaker }) => {
  const [talksList, setTalksList] = useState([]);
  const [selectedTalks, setSelectedTalks] = useState([]);

  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);

  const handleTalksUpdate = async (value) => {
    value = value.sort((a, b) => {
      return a.talk_number > b.talk_number ? 1 : -1;
    });

    await updateSpeakerTalks({
      talks: value,
      person_uid: speaker.person_uid,
      cong_number: speaker.cong_number,
    });
    setSelectedTalks(value);
  };

  useEffect(() => {
    const getS34Local = async () => {
      const options = await publicTalksLocale();
      setTalksList(options);

      const selected = speaker.talks.map((talk) => {
        const found = options.find((record) => record.talk_number === talk);
        return found;
      });

      setSelectedTalks(selected);
    };

    getS34Local();
  }, [speaker]);

  return { talksList, selectedTalks, isEditor, handleTalksUpdate };
};

export default useSpeakerTalks;
