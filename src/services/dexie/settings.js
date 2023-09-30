import { promiseGetRecoil } from 'recoil-outside';
import { settingsState } from '@states/settings';
import appDb from '.';

export const handleUpdateSetting = async ({ field, value }) => {
  const currentSettings = await promiseGetRecoil(settingsState);
  const newSettings = { ...currentSettings, [field]: value };

  await appDb.app_settings.put(newSettings);
};
