import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { publicTalkCoordinatorRoleState } from '@states/settings';
import { updateSpeakerTalks } from '@services/dexie/visitingSpeakers';
import { publicTalksLocaleState } from '@states/publicTalks';

const useSpeakerTalks = ({ speaker }) => {
  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);
  const talksList = useRecoilValue(publicTalksLocaleState);

  const [selectedTalks, setSelectedTalks] = useState([]);

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
    const selected = speaker.talks.map((talk) => {
      const found = talksList.find((record) => record.talk_number === talk);
      return found;
    });

    setSelectedTalks(selected);
  }, [speaker, talksList]);

  return { talksList, selectedTalks, isEditor, handleTalksUpdate };
};

export default useSpeakerTalks;
