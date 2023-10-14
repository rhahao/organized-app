import {
  coordinatorRoleState,
  lmmoRoleState,
  personEditorRoleState,
  publicTalkCoordinatorRoleState,
} from '@states/settings';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const useAssignments = ({ assignments, setAssignments }) => {
  const isEditAllowed = useRecoilValue(personEditorRoleState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);

  const [isMidweekChairman, setIsMidweekChairman] = useState(false);
  const [isMidweekPrayer, setIsMidweekPrayer] = useState(false);
  const [isTGWTalk, setIsTGWTalk] = useState(false);
  const [isTGWGems, setIsTGWGems] = useState(false);
  const [isTGWBibleReading, setIsTGWBibleReading] = useState(false);
  const [isAYFInitialCall, setIsAYFInitialCall] = useState(false);
  const [isAYFReturnVisit, setIsAYFReturnVisit] = useState(false);
  const [isAYFBibleStudy, setIsAYFBibleStudy] = useState(false);
  const [isAYFTalk, setIsAYFTalk] = useState(false);
  const [isLCPart, setIsLCPart] = useState(false);
  const [isLCCBSConductor, setIsLCCBSConductor] = useState(false);
  const [isLCCBSReader, setIsLCCBSReader] = useState(false);
  const [isWeekendChairman, setIsWeekendChairman] = useState(false);
  const [isWeekendPrayer, setIsWeekendPrayer] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isSpeakerSymposium, setIsSpeakerSymposium] = useState(false);
  const [isWTStudyReader, setIsWTStudyReader] = useState(false);

  const updateLocalState = (code) => {
    if (code === 100) return setIsTGWBibleReading(false);
    if (code === 101) return setIsAYFInitialCall(false);
    if (code === 102) return setIsAYFReturnVisit(false);
    if (code === 103) return setIsAYFBibleStudy(false);
    if (code === 104) return setIsAYFTalk(false);
    if (code === 110) return setIsMidweekChairman(false);
    if (code === 111) return setIsMidweekPrayer(false);
    if (code === 112) return setIsTGWTalk(false);
    if (code === 113) return setIsTGWGems(false);
    if (code === 114) return setIsLCPart(false);
    if (code === 115) return setIsLCCBSConductor(false);
    if (code === 116) return setIsLCCBSReader(false);
    if (code === 118) return setIsWeekendChairman(false);
    if (code === 119) return setIsWeekendPrayer(false);
    if (code === 120) return setIsSpeaker(false);
    if (code === 121) return setIsSpeakerSymposium(false);
    if (code === 122) return setIsWTStudyReader(false);
  };

  const handleAssignmentsChange = (code, value) => {
    if (!value) {
      updateLocalState(code);
    }

    setAssignments((prev) => {
      let newAssignments = [...prev];
      if (value) {
        const isFound = newAssignments.find((assignment) => assignment.code === code);
        if (!isFound) newAssignments.push({ code });
      }

      if (!value) {
        const findIndex = newAssignments.findIndex((assignment) => assignment.code === code);
        if (findIndex !== -1) newAssignments.splice(findIndex, 1);
      }

      return newAssignments;
    });
  };

  useEffect(() => {
    assignments.forEach((assignment) => {
      switch (assignment.code) {
        case 100:
          setIsTGWBibleReading(true);
          break;
        case 101:
          setIsAYFInitialCall(true);
          break;
        case 102:
          setIsAYFReturnVisit(true);
          break;
        case 103:
          setIsAYFBibleStudy(true);
          break;
        case 104:
          setIsAYFTalk(true);
          break;
        case 110:
          setIsMidweekChairman(true);
          break;
        case 111:
          setIsMidweekPrayer(true);
          break;
        case 112:
          setIsTGWTalk(true);
          break;
        case 113:
          setIsTGWGems(true);
          break;
        case 114:
          setIsLCPart(true);
          break;
        case 115:
          setIsLCCBSConductor(true);
          break;
        case 116:
          setIsLCCBSReader(true);
          break;
        case 118:
          setIsWeekendChairman(true);
          break;
        case 119:
          setIsWeekendPrayer(true);
          break;
        case 120:
          setIsSpeaker(true);
          break;
        case 121:
          setIsSpeakerSymposium(true);
          break;
        case 122:
          setIsWTStudyReader(true);
          break;
        default:
          break;
      }
    });
  }, [assignments]);

  return {
    handleAssignmentsChange,
    isEditAllowed,
    isMidweekChairman,
    isMidweekPrayer,
    isTGWTalk,
    isTGWGems,
    isTGWBibleReading,
    isAYFInitialCall,
    isAYFReturnVisit,
    isAYFBibleStudy,
    isAYFTalk,
    isLCPart,
    isLCCBSConductor,
    isLCCBSReader,
    isWeekendChairman,
    isWeekendPrayer,
    isSpeaker,
    isSpeakerSymposium,
    isWTStudyReader,
    lmmoRole,
    coordinatorRole,
    publicTalkCoordinatorRole,
  };
};

export default useAssignments;
