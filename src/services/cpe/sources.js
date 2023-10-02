import { loadEPUB } from 'jw-epub-parser';
import { deleteSource, epubSaveSource, sourcesAddWeekManually } from '@services/dexie/sources';
import { displaySnackNotification } from '@services/recoil/app';
import { getTranslation } from '@services/i18n/translation';

export const addEpubDataToDb = async (fileEPUB) => {
  const data = await loadEPUB(fileEPUB);
  await epubSaveSource(data);
};

export const addJwDataToDb = async (dataJw) => {
  await epubSaveSource(dataJw);
};

export const handleWeekAddConfirm = async () => {
  await sourcesAddWeekManually();

  await displaySnackNotification({
    message: getTranslation({ key: 'weekAdded' }),
    severity: 'success',
  });
};

export const handleWeekDeleteConfirm = async (action) => {
  const week = action.split('-')[1];

  await deleteSource(week);

  await displaySnackNotification({
    message: getTranslation({ key: 'weekDeletedSuccess' }),
    severity: 'success',
  });
};
