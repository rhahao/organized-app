import { deleteVisitingSpeaker } from '@services/dexie/visitingSpeakers';

const useOutgoing = ({ speaker }) => {
  const handleDeleteVisitingSpeaker = async () => {
    await deleteVisitingSpeaker({
      person_uid: speaker.person_uid,
      cong_number: speaker.cong_number,
    });
  };

  return { handleDeleteVisitingSpeaker };
};

export default useOutgoing;
