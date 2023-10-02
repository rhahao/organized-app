import { apiFetchSchedule } from '@services/api/schedule';
import { saveSchedule } from '@services/dexie/schedules';
import { handleUpdateSetting } from '@services/dexie/settings';
import { saveSource } from '@services/dexie/sources';
import { setRootModalOpen } from '@services/recoil/app';

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
