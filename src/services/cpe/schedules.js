import { saveSchedule } from '@services/dexie/schedules';
import { handleBulkUpdateSetting } from '@services/dexie/settings';
import { saveSource } from '@services/dexie/sources';

export const handleUpdateScheduleFromRemote = async (data) => {
  const { cong_schedule, cong_sourceMaterial, cong_settings } = data;

  for await (const week of cong_sourceMaterial) {
    await saveSource({ srcData: week, localOverride: false, forPocket: true });
  }

  for await (const week of cong_schedule) {
    await saveSchedule(week);
  }

  const { class_count, source_lang, co_name, co_displayName, opening_prayer_MM_autoAssign } = cong_settings;
  await handleBulkUpdateSetting({
    class_count,
    source_lang,
    co_name,
    co_displayName,
    opening_prayer_MM_autoAssign,
  });
};
