import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { congSpeakersRequestsStatusState, visitingSpeakersCongregationsState } from '@states/visitingSpeakers';
import { congNameState, congNumberState, publicTalkCoordinatorRoleState } from '@states/settings';
import { getCongregation } from '@services/cpe/visitingSpeakers';
import { updateSpeakersRequestsStatus } from '@services/dexie/visitingSpeakers';

const useVisitingSpeakers = () => {
  const congSpeakersRequests = useRecoilValue(congSpeakersRequestsStatusState);
  const isEditor = useRecoilValue(publicTalkCoordinatorRoleState);
  const congNumber = useRecoilValue(congNumberState);
  const congName = useRecoilValue(congNameState);
  const visitingSpeakersCongregations = useRecoilValue(visitingSpeakersCongregationsState);

  const [expanded, setExpanded] = useState('');
  const [isCongregationAdd, setIsCongregationAdd] = useState(false);
  const [congsList, setCongsList] = useState([]);
  const [speakersAccessOpen, setSpeakersAccessOpen] = useState(false);
  const [selfCong, setSelfCong] = useState({});

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCongregationAdd = () => {
    setExpanded('');
    setIsCongregationAdd(true);
  };

  const handleToggleAccessOpen = (e) => {
    e.stopPropagation();

    setExpanded(congNumber);
    setSpeakersAccessOpen((prev) => !prev);
  };

  useEffect(() => {
    const getSelfCong = async () => {
      let result;

      const selfCong = await getCongregation(congNumber);

      if (selfCong) result = selfCong;
      if (!selfCong) result = { cong_name: congName, cong_number: congNumber };

      setSelfCong(result);
    };

    getSelfCong();
  }, [congName, congNumber]);

  useEffect(() => {
    const congs = visitingSpeakersCongregations
      .filter((record) => record.cong_number !== +congNumber)
      .sort((a, b) => {
        return a.cong_name > b.cong_name ? 1 : -1;
      });
    setCongsList(congs);
  }, [congNumber, visitingSpeakersCongregations]);

  useEffect(() => {
    const updateRequestsStatus = async () => {
      await updateSpeakersRequestsStatus(congSpeakersRequests);
    };

    updateRequestsStatus();
  }, [congSpeakersRequests]);

  return {
    isEditor,
    expanded,
    isCongregationAdd,
    congsList,
    speakersAccessOpen,
    selfCong,
    handleChange,
    handleCongregationAdd,
    handleToggleAccessOpen,
    congNumber,
    setIsCongregationAdd,
  };
};

export default useVisitingSpeakers;
