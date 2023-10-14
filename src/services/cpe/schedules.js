import { apiFetchSchedule } from '@services/api/schedule';
import { saveSchedule } from '@services/dexie/schedules';
import { handleUpdateSetting } from '@services/dexie/settings';
import { saveSource } from '@services/dexie/sources';
import { setRootModalOpen } from '@services/recoil/app';
import { promiseGetRecoil } from 'recoil-outside';
import { getSourceLocal } from './sources';
import { shortDateFormatState } from '@states/app';
import { formatDate } from '@services/dateformat';
import { elderRoleState } from '@states/settings';
import { schedulesState } from '@states/schedules';
import { getPerson } from './persons';
import { getTranslation } from '@services/i18n/translation';
import { getVisitingSpeakerByUID } from './visitingSpeakers';

export const handleUpdateScheduleFromRemote = async (data) => {
  const { cong_schedule, cong_sourceMaterial, cong_settings } = data;

  for await (const week of cong_sourceMaterial) {
    await saveSource({ srcData: week, localOverride: false, forPocket: true });
  }

  for await (const week of cong_schedule) {
    await saveSchedule(week);
  }

  const { class_count, source_lang, co_name, co_displayName, opening_prayer_MM_autoAssign } = cong_settings;
  await handleUpdateSetting({
    class_count,
    source_lang,
    co_name,
    co_displayName,
    opening_prayer_MM_autoAssign,
  });
};

export const handleFetchSchedule = async () => {
  await setRootModalOpen(true);
  const { status: scheduleStatus, data: scheduleData } = await apiFetchSchedule();
  if (scheduleStatus === 200) {
    await handleUpdateScheduleFromRemote(scheduleData);
  }
  await setRootModalOpen(false);
};

export const getSchedule = async (weekOf) => {
  const schedules = await promiseGetRecoil(schedulesState);
  const schedule = schedules.find((s) => s.weekOf === weekOf);
  return schedule;
};

export const getHistoryInfo = async (weekOf) => {
  const weekData = await getSourceLocal(weekOf);
  const schedule = await getSchedule(weekOf);

  const shortDateFormat = await promiseGetRecoil(shortDateFormatState);
  const elderLocalRole = await promiseGetRecoil(elderRoleState);

  const [varYear, varMonth, varDay] = weekOf.split('/');
  const lDate = new Date(varYear, varMonth - 1, varDay);
  const dateFormatted = formatDate(lDate, shortDateFormat);

  const result = [];
  const excludedKey = [
    'weekOf',
    'week_type',
    'noMMeeting',
    'noWMeeting',
    'isReleased',
    'changes',
    'is_visiting_speaker',
    'public_talk',
    'event_name',
  ];

  const assignments = Object.keys(schedule).filter((key) => excludedKey.includes(key) === false);

  for await (const assignment of assignments) {
    if (schedule[assignment] !== '') {
      const history = {};
      history.ID = crypto.randomUUID();
      history.weekOf = schedule.weekOf;
      history.weekOfFormatted = dateFormatted;
      history.person_uid = schedule[assignment];

      if (elderLocalRole) {
        const person = await getPerson(history.person_uid);
        history.studentName = person?.person_displayName || '';
      }

      if (!elderLocalRole) {
        const fldDispName = `${assignment}_dispName`;
        history.studentName = schedule[fldDispName];
      }

      history.class = '';
      history.assignment = assignment;

      // Chairman History
      if (assignment === 'chairmanMM_A') {
        history.assignmentID = 110;
        history.assignmentName = getTranslation({ key: 'chairmanMidweekMeeting2' });
      }

      // Aux Class Counselor History
      if (assignment === 'chairmanMM_B') {
        history.assignmentID = 110;
        history.assignmentName = getTranslation({ key: 'auxClassCounselor' });
      }

      // Opening Prayer
      if (assignment === 'opening_prayerMM') {
        history.assignmentID = 111;
        history.assignmentName = getTranslation({ key: 'openingPrayerMidweekMeeting' });
      }

      // TGW Talk 10 min. History
      if (assignment === 'tgw_talk') {
        history.assignmentID = 112;
        history.assignmentName = getTranslation({ key: 'tgwTalk', namespace: 'source' });
        history.assignmentSource = weekData.mwb_tgw_talk;
      }

      // TGW Spiritual Gems History
      if (assignment === 'tgw_gems') {
        history.assignmentID = 113;
        history.assignmentName = getTranslation({ key: 'tgwGems', namespace: 'source' });
      }

      //Bible Reading History
      if (assignment.startsWith('bRead_stu_')) {
        const stuclass = assignment.split('_')[2];
        history.assignmentID = 100;
        history.assignmentName = getTranslation({ key: 'bibleReading', namespace: 'source' });
        history.class = stuclass;
        history.assignmentSource = weekData.mwb_tgw_bread;
      }

      //AYF
      if (assignment.startsWith('ass')) {
        const srcFld = 'mwb_ayf_' + assignment.split('_')[0].replace('ass', 'part');
        const timeFld = 'mwb_ayf_' + assignment.split('_')[0].replace('ass', 'part') + '_time';
        history.assignmentSource = weekData[srcFld];
        history.assignmentTime = weekData[timeFld];
      }

      //AYF Assigment History
      if (assignment.startsWith('ass') && assignment.includes('_stu_')) {
        const stuclass = assignment.split('_')[2];
        const weekFld = 'mwb_ayf_' + assignment.split('_')[0].replace('ass', 'part') + '_type';
        const assType = weekData[weekFld];

        history.assignmentID = assType;
        history.assignmentType = 'ayf';
        if (assType === 101 || (assType >= 140 && assType < 170)) {
          history.assignmentName = getTranslation({ key: 'initialCall', namespace: 'source' });
        } else if (assType === 102 || (assType >= 170 && assType < 200)) {
          history.assignmentName = getTranslation({ key: 'returnVisit', namespace: 'source' });
        } else if (assType === 103) {
          history.assignmentName = getTranslation({ key: 'bibleStudy', namespace: 'source' });
        } else if (assType === 104) {
          history.assignmentName = getTranslation({ key: 'talk', namespace: 'source' });
        } else if (assType === 108) {
          history.assignmentName = getTranslation({ key: 'memorialInvite', namespace: 'source' });
        }
        history.class = stuclass;

        const fldStudent = assignment.replace('_stu_', '_ass_');
        const fldValue = schedule[fldStudent];

        if (elderLocalRole) {
          const person = await getPerson(fldValue);
          history.assistantDispName = person?.person_displayName || '';
        }

        if (!elderLocalRole) {
          const fldDispName = `${fldStudent}_dispName`;
          history.assistantDispName = schedule[fldDispName];
        }
      }

      // AYF Assistant History
      if (assignment.startsWith('ass') && assignment.includes('_ass_')) {
        const fldStudent = assignment.replace('_ass_', '_stu_');
        const fldValue = schedule[fldStudent];
        const weekFld = 'mwb_ayf_' + assignment.split('_')[0].replace('ass', 'part') + '_type';
        const assType = weekData[weekFld];

        if (elderLocalRole) {
          const person = await getPerson(fldValue);
          history.studentForAssistant = person?.person_displayName || '';
        }

        if (!elderLocalRole) {
          const fldDispName = `${fldStudent}_dispName`;
          history.studentForAssistant = schedule[fldDispName];
        }

        history.assignmentID = 109;
        history.assignmentType = 'ayf';

        const assistantStr = getTranslation({ key: 'assistant' });

        let mainPart;
        if (assType === 101 || (assType >= 140 && assType < 170)) {
          mainPart = getTranslation({ key: 'initialCall', namespace: 'source' });
        } else if (assType === 102 || (assType >= 170 && assType < 200)) {
          mainPart = getTranslation({ key: 'returnVisit', namespace: 'source' });
        } else if (assType === 103) {
          mainPart = getTranslation({ key: 'bibleStudy', namespace: 'source' });
        } else if (assType === 108) {
          mainPart = getTranslation({ key: 'memorialInvite', namespace: 'source' });
        }

        history.assignmentName = `${assistantStr} (${mainPart})`;

        const stuclass = assignment.split('_')[2];
        history.class = stuclass;
      }

      // LC Assignment History
      if (assignment.startsWith('lc_part')) {
        const lcIndex = assignment.slice(-1);
        const fldSource = `mwb_lc_part${lcIndex}`;
        const fldTime = `mwb_lc_part${lcIndex}_time`;
        const fldContent = `mwb_lc_part${lcIndex}_content`;

        history.assignmentID = 114;
        history.assignmentName = getTranslation({ key: 'lcPart', namespace: 'source' });
        history.assignmentSource = `(${weekData[fldTime]} min.) ${weekData[fldSource]}`;
        history.assignmentContent = weekData[fldContent];
      }

      // CBS Conductor History
      if (assignment === 'cbs_conductor') {
        history.assignmentID = 115;
        history.assignmentName = getTranslation({ key: 'cbsConductor', namespace: 'source' });
        history.assignmentName += ` (${getTranslation({ key: 'cbs', namespace: 'source' })})`;
        history.assignmentSource = weekData.mwb_lc_cbs;
      }

      // CBS Reader History
      if (assignment === 'cbs_reader') {
        history.assignmentID = 116;
        history.assignmentName = getTranslation({ key: 'cbsReader', namespace: 'source' });
        history.assignmentName += ` (${getTranslation({ key: 'cbs', namespace: 'source' })})`;
        history.assignmentSource = weekData.mwb_lc_cbs;
      }

      // Closing Prayer History
      if (assignment === 'closing_prayerMM') {
        history.assignmentID = 111;
        history.assignmentName = getTranslation({ key: 'closingPrayer' });
      }

      // Weekend Meeting Chairman
      if (assignment === 'chairman_WM') {
        history.assignmentID = 118;
        history.assignmentName = getTranslation({ key: 'chairmanWeekendMeeting' });
      }

      // Weekend Meeting Opening Prayer
      if (assignment === 'opening_prayerWM') {
        history.assignmentID = 119;
        history.assignmentName = getTranslation({ key: 'openingPrayerWeekendMeeting' });
      }

      // Weekend Meeting Speaker 1
      if (assignment === 'speaker_1') {
        if (elderLocalRole && schedule.is_visiting_speaker) {
          const person = await getVisitingSpeakerByUID(history.person_uid);
          history.studentName = person?.person_displayName || '';
        }

        history.assignmentSource = schedule.public_talk_title;
        history.assignmentID = 121;

        if (schedule.speaker_2 === '') {
          history.assignmentName = getTranslation({ key: 'speaker' });
        }

        if (schedule.speaker_2 !== '') {
          if (elderLocalRole) {
            const person = await getPerson(schedule.speaker_2);
            history.speaker2DispName = person?.person_displayName || '';
          }

          if (!elderLocalRole) {
            history.speaker2DispName = schedule.speaker_2_dispName;
          }

          history.assignmentName = getTranslation({ key: 'speakerSymposiumPart1' });
        }
      }

      // Weekend Meeting Speaker 2
      if (assignment === 'speaker_2') {
        history.assignmentSource = schedule.public_talk_title;
        history.assignmentID = 120;

        if (elderLocalRole) {
          const person = await getPerson(schedule.speaker_1);
          history.speaker1DispName = person?.person_displayName || '';
        }

        if (!elderLocalRole) {
          history.speaker1DispName = schedule.speaker_1_dispName;
        }

        history.assignmentName = getTranslation({ key: 'speakerSymposiumPart2' });
      }

      // Substitute Speaker
      if (assignment === 'substitute_speaker') {
        history.assignmentID = 120;
        history.assignmentName = getTranslation({ key: 'substituteSpeaker', namespace: 'source' });
      }

      // Watchtower Study Reader
      if (assignment === 'wtstudy_reader') {
        history.assignmentSource = weekData.w_study_title;
        history.assignmentID = 122;
        history.assignmentName = getTranslation({ key: 'wtStudyReader' });
      }

      result.push(history);
    }
  }

  return result;
};
