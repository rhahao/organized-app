import Dexie from 'dexie';
import { appDb } from '.';

export const deleteAppDb = async () => {
  await appDb.close();
  await Dexie.delete('cpe_sws');
};

export const dbExportTable = async (table_name) => {
  const result = await appDb.table(table_name).toArray();
  return result;
};
