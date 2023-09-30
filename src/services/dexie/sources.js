import { promiseGetRecoil } from 'recoil-outside';
import { schedulesState } from '@states/schedules';
import { getWeekDate, getOldestWeekDate } from '@utils/date';
import { sourcesState } from '@states/sources';
import { formatDate } from '@services/dateformat';
import appDb from './db';
import { appLangState } from '@states/app';
import { coordinatorRoleState, lmmoRoleState } from '@states/settings';

export const removeSourcesOutdatedRecords = async () => {
  const oldestWeekDate = getOldestWeekDate();
  const oldDateFormat = formatDate(oldestWeekDate, 'yyyy/mm/dd');

  const schedules = await promiseGetRecoil(schedulesState);
  const oldSchedules = schedules.filter((schedule) => schedule.weekOf < oldDateFormat);
  for await (const schedule of oldSchedules) {
    await appDb.sched.delete(schedule.weekOf);
  }

  const sources = await promiseGetRecoil(sourcesState);
  const oldSources = sources.filter((source) => source.weekOf < oldDateFormat);
  for await (const source of oldSources) {
    await appDb.sources.delete(source.weekOf);
  }
};

export const sourcesHaveCurrentWeek = async () => {
  const sources = await promiseGetRecoil(sourcesState);

  const weekDate = getWeekDate();

  const fMonday = formatDate(weekDate, 'yyyy/mm/dd');
  const data = sources.find((source) => source.weekOf === fMonday);

  return data ? true : false;
};

export const sourcesAddWeekManually = async () => {
  const sources = await promiseGetRecoil(sourcesState);
  const schedules = await promiseGetRecoil(schedulesState);

  let weekDate;

  if (sources.length === 0) {
    weekDate = new Date();
  } else {
    sources.sort((a, b) => {
      return a.weekOf < b.weekOf ? 1 : -1;
    });

    const lastWeek = sources.list[0].weekOf;
    const day = lastWeek.split('/')[2];
    const month = lastWeek.split('/')[1];
    const year = lastWeek.split('/')[0];
    weekDate = new Date(year, month - 1, day);
    weekDate.setDate(weekDate.getDate() + 7);
  }

  const monDay = getWeekDate(weekDate);
  const fMonday = formatDate(monDay, 'yyyy/mm/dd');

  const foundSource = sources.find((source) => source.weekOf === fMonday);
  if (!foundSource) {
    await appDb.sources.add({ weekOf: fMonday });
  }

  const foundSchedule = schedules.find((schedule) => schedule.weekOf === fMonday);
  if (!foundSchedule) {
    await appDb.sched.add({ weekOf: fMonday });
  }
};

export const checkCurrentWeek = async () => {
  const isExist = await sourcesHaveCurrentWeek();

  if (!isExist) {
    await sourcesAddWeekManually();
  }
};

export const saveSource = async ({ srcData, localOverride, forPocket }) => {
  const sourceLang = await promiseGetRecoil(appLangState);
  const lmmoRole = await promiseGetRecoil(lmmoRoleState);
  const coordinatorRole = await promiseGetRecoil(coordinatorRoleState);
  const sources = await promiseGetRecoil(sourcesState);

  const source_lang = sourceLang.toUpperCase();
  const isUpdateMidweek = !forPocket || (forPocket && !lmmoRole);
  const isUpdateWeekend = !forPocket || (forPocket && !coordinatorRole);

  const tmpSource = sources.find((s) => s.weekOf === srcData.weekOf);
  const source = { ...tmpSource };

  if (isUpdateMidweek) {
    source.mwb_week_date_locale[source_lang] = srcData.mwb_week_date_locale || '';
    source.mwb_weekly_bible_reading[source_lang] = srcData.mwb_weekly_bible_reading || '';
    source.mwb_song_first = srcData.mwb_song_first || '';
    source.mwb_tgw_talk[source_lang] = srcData.mwb_tgw_talk || '';
    source.mwb_tgw_bread[source_lang] = srcData.mwb_tgw_bread || '';
    source.mwb_ayf_count = srcData.mwb_ayf_count || 1;
    if (typeof source.mwb_ayf_part1_type === 'number') source.mwb_ayf_part1_type = {};
    source.mwb_ayf_part1_type[source_lang] = srcData.mwb_ayf_part1_type || '';
    source.mwb_ayf_part1_time = srcData.mwb_ayf_part1_time || '';
    source.mwb_ayf_part1[source_lang] = srcData.mwb_ayf_part1 || '';
    if (typeof source.mwb_ayf_part2_type === 'number') source.mwb_ayf_part2_type = {};
    source.mwb_ayf_part2_type[source_lang] = srcData.mwb_ayf_part2_type || '';
    source.mwb_ayf_part2_time = srcData.mwb_ayf_part2_time || '';
    source.mwb_ayf_part2[source_lang] = srcData.mwb_ayf_part2 || '';
    if (typeof source.mwb_ayf_part3_type === 'number') source.mwb_ayf_part3_type = {};
    source.mwb_ayf_part3_type[source_lang] = srcData.mwb_ayf_part3_type || '';
    source.mwb_ayf_part3_time = srcData.mwb_ayf_part3_time || '';
    source.mwb_ayf_part3[source_lang] = srcData.mwb_ayf_part3 || '';
    if (typeof source.mwb_ayf_part4_type === 'number') source.mwb_ayf_part4_type = {};
    source.mwb_ayf_part4_type[source_lang] = srcData.mwb_ayf_part4_type || '';
    source.mwb_ayf_part4_time = srcData.mwb_ayf_part4_time || '';
    source.mwb_ayf_part4[source_lang] = srcData.mwb_ayf_part4 || '';
    source.mwb_song_middle = srcData.mwb_song_middle || '';
    source.mwb_lc_count = srcData.mwb_lc_count || 1;
    source.mwb_lc_count_override = localOverride ? source.mwb_lc_count_override : srcData.mwb_lc_count_override;
    source.mwb_lc_part1_time = srcData.mwb_lc_part1_time || '';
    source.mwb_lc_part1_time_override = localOverride
      ? source.mwb_lc_part1_time_override
      : srcData.mwb_lc_part1_time_override;
    source.mwb_lc_part1[source_lang] = srcData.mwb_lc_part1 || '';
    source.mwb_lc_part1_override[source_lang] = localOverride
      ? source.mwb_lc_part1_override[source_lang]
      : srcData.mwb_lc_part1_override;
    source.mwb_lc_part1_content[source_lang] = srcData.mwb_lc_part1_content || '';
    source.mwb_lc_part1_content_override[source_lang] = localOverride
      ? source.mwb_lc_part1_content_override[source_lang]
      : srcData.mwb_lc_part1_content_override;
    source.mwb_lc_part2_time = srcData.mwb_lc_part2_time || '';
    source.mwb_lc_part2_time_override = localOverride
      ? source.mwb_lc_part2_time_override
      : srcData.mwb_lc_part2_time_override;
    source.mwb_lc_part2[source_lang] = srcData.mwb_lc_part2 || '';
    source.mwb_lc_part2_override[source_lang] = localOverride
      ? source.mwb_lc_part2_override[source_lang]
      : srcData.mwb_lc_part2_override;
    source.mwb_lc_part2_content[source_lang] = srcData.mwb_lc_part2_content || '';
    source.mwb_lc_part2_content_override[source_lang] = localOverride
      ? source.mwb_lc_part2_content_override[source_lang]
      : srcData.mwb_lc_part2_content_override;
    source.mwb_lc_cbs[source_lang] = srcData.mwb_lc_cbs || '';
    source.mwb_lc_cbs_time_override = localOverride
      ? source.mwb_lc_cbs_time_override
      : srcData.mwb_lc_cbs_time_override;
    source.mwb_song_conclude = srcData.mwb_song_conclude || '';
    source.mwb_song_conclude_override = srcData.mwb_song_conclude_override;
    source.mwb_co_talk_title = srcData.mwb_co_talk_title || '';
  }

  if (isUpdateWeekend) {
    source.w_co_talk_title = srcData.w_co_talk_title || '';
    source.w_study_date_locale[source_lang] = srcData.w_study_date_locale || '';
    source.w_study_title[source_lang] = srcData.w_study_title || '';
    source.w_study_opening_song = srcData.w_study_opening_song || '';
    source.w_study_concluding_song = srcData.w_study_concluding_song || '';
  }

  source.keepOverride = localOverride ? source.keepOverride : new Date().toISOString();

  await appDb.sources.put(sources);
};
