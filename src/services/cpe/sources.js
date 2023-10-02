import { loadEPUB } from 'jw-epub-parser';
import { epubSaveSource } from '@services/dexie/sources';

export const addEpubDataToDb = async (fileEPUB) => {
  const data = await loadEPUB(fileEPUB);
  await epubSaveSource(data);
};

export const addJwDataToDb = async (dataJw) => {
  await epubSaveSource(dataJw);
};
