import { useRecoilValue } from 'recoil';
import { talkHistoryState } from '@states/schedules';

const useHistory = ({ talk_number }) => {
  const talksHistory = useRecoilValue(talkHistoryState);

  const history = talksHistory.find((record) => record.talk_number === talk_number);

  const getSpeaker = (record) => {
    let speaker = record.speaker_1_dispName;
    if (record.speaker_2_dispName !== '') speaker += ` / ${record.speaker_2_dispName}`;

    return speaker;
  };

  return { history, getSpeaker };
};

export default useHistory;
