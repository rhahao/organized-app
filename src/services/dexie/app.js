import Dexie from 'dexie';
import { appDb } from '.';

export const deleteAppDb = async () => {
  await appDb.close();
  await Dexie.delete('cpe_sws');
};
