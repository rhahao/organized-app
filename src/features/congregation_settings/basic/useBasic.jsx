import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  autoAssignMMOpeningPrayerState,
  autoAssignWMOpeningPrayerState,
  classCountState,
  coDisplayNameState,
  coNameState,
  congNameState,
  congNumberState,
  coordinatorRoleState,
  lmmoRoleState,
  meetingTimeState,
  midweekMeetingDayState,
  midweekMeetingExactDateState,
  publicTalkCoordinatorRoleState,
  scheduleUseFullnameState,
  weekendMeetingDayState,
  weekendMeetingSubstituteSpeakerState,
} from '@states/settings';
import { handleUpdateSetting } from '@services/dexie/settings';
import { generateDisplayName } from '@utils/common';

const useBasic = () => {
  const congName = useRecoilValue(congNameState);
  const congNumber = useRecoilValue(congNumberState);
  const classCount = useRecoilValue(classCountState);
  const midweekMeetingDay = useRecoilValue(midweekMeetingDayState);
  const meetingTime = useRecoilValue(meetingTimeState);
  const autoAssignMMOpeningPrayer = useRecoilValue(autoAssignMMOpeningPrayerState);
  const autoAssignWMOpeningPrayer = useRecoilValue(autoAssignWMOpeningPrayerState);
  const scheduleUseFullname = useRecoilValue(scheduleUseFullnameState);
  const weekendMeetingDay = useRecoilValue(weekendMeetingDayState);
  const midweekMeetingExactDate = useRecoilValue(midweekMeetingExactDateState);
  const weekendMeetingSubstituteSpeaker = useRecoilValue(weekendMeetingSubstituteSpeakerState);
  const coName = useRecoilValue(coNameState);
  const coDisplayName = useRecoilValue(coDisplayNameState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);

  const [tempMidweekMeetingDay, setTempMidweekMeetingDay] = useState(midweekMeetingDay);
  const [tempClassCount, setTempClassCount] = useState(classCount);
  const [tempMeetingTime, setTempMeetingTime] = useState(meetingTime ? new Date(meetingTime) : null);
  const [tempCOName, setTempCOName] = useState(coName);
  const [tempCODisplayName, setTempCODisplayName] = useState(coDisplayName);
  const [tmpautoAssignMMOpeningPrayer, setTmpautoAssignMMOpeningPrayer] = useState(autoAssignMMOpeningPrayer);
  const [tmpautoAssignWMOpeningPrayer, setTmpautoAssignWMOpeningPrayer] = useState(autoAssignWMOpeningPrayer);
  const [useFullname, setUseFullname] = useState(scheduleUseFullname);
  const [tempWeekendMeetingDay, setTempWeekendMeetingDay] = useState(weekendMeetingDay);
  const [tmpMidweekMeetingExactDate, setTmpMidweekMeetingExactDate] = useState(midweekMeetingExactDate);
  const [tmpWeekendMeetingSubstituteSpeaker, setTmpWeekendMeetingSubstituteSpeaker] = useState(
    weekendMeetingSubstituteSpeaker
  );

  const handleMidweekMeetingDayChange = async (e) => {
    setTempMidweekMeetingDay(e.target.value);
    await handleUpdateSetting({ midweek_meeting_day: e.target.value });
  };

  const handleClassChange = async (e) => {
    setTempClassCount(e.target.value);
    await handleUpdateSetting({ class_count: e.target.value });
  };

  const handleMeetingTimeChange = async (value) => {
    setTempMeetingTime(value);
    await handleUpdateSetting({ meeting_time: value });
  };

  const handleChangeCOName = async (value) => {
    setTempCOName(value);

    const dispName = generateDisplayName(value);
    setTempCODisplayName(dispName);

    const obj = {};
    obj.co_name = value;
    obj.co_displayName = dispName;
    await handleUpdateSetting(obj);
  };

  const handleChangeCODispName = async (value) => {
    setTempCODisplayName(value);
    await handleUpdateSetting({ co_displayName: value });
  };

  const handleSwitchMMAutoAssignPrayer = async (value) => {
    setTmpautoAssignMMOpeningPrayer(value);
    await handleUpdateSetting({ opening_prayer_MM_autoAssign: value });
  };

  const handleSwitchWMAutoAssignPrayer = async (value) => {
    setTmpautoAssignWMOpeningPrayer(value);
    await handleUpdateSetting({ opening_prayer_WM_autoAssign: value });
  };

  const handleChangeFullnameSwitch = async (value) => {
    setUseFullname(value);
    await handleUpdateSetting({ schedule_useFullname: value });
  };

  const handleWeekendMeetingDayChange = async (e) => {
    setTempWeekendMeetingDay(e.target.value);
    await handleUpdateSetting({ weekend_meeting_day: e.target.value });
  };

  const handleSwitchMMExactDate = async (value) => {
    setTmpMidweekMeetingExactDate(value);
    await handleUpdateSetting({ midweek_meeting_useExactDate: value });
  };

  const handleSwitchWMSubstituteSpeaker = async (value) => {
    setTmpWeekendMeetingSubstituteSpeaker(value);
    await handleUpdateSetting({ weekend_meeting_useSubstituteSpeaker: value });
  };

  return {
    congName,
    congNumber,
    lmmoRole,
    coordinatorRole,
    publicTalkCoordinatorRole,
    tempMidweekMeetingDay,
    tempClassCount,
    tempMeetingTime,
    tempCOName,
    tempCODisplayName,
    tmpautoAssignMMOpeningPrayer,
    tmpautoAssignWMOpeningPrayer,
    useFullname,
    tempWeekendMeetingDay,
    tmpMidweekMeetingExactDate,
    tmpWeekendMeetingSubstituteSpeaker,
    handleMidweekMeetingDayChange,
    handleClassChange,
    handleMeetingTimeChange,
    handleChangeCOName,
    handleChangeCODispName,
    handleSwitchMMAutoAssignPrayer,
    handleSwitchWMAutoAssignPrayer,
    handleChangeFullnameSwitch,
    handleWeekendMeetingDayChange,
    handleSwitchMMExactDate,
    handleSwitchWMSubstituteSpeaker,
  };
};

export default useBasic;
