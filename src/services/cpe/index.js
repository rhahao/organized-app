import { promiseGetRecoil } from 'recoil-outside';
import { checkCurrentWeek, removeSourcesOutdatedRecords } from '@services/dexie/sources';
import { accountTypeState, isMeetingEditorRoleState } from '@states/settings';
import { getTranslation, handleAppChangeLanguage } from '@services/i18n/translation';
import { appLangState } from '@states/app';
import { userSignOut } from '@services/firebase/auth';
import { disconnectCongAccount, displaySnackNotification } from '@services/dexie/app';
import { updateAssignmentType, updateWeekType } from './updater';

export const loadApp = async () => {
  const isMeetingEditor = await promiseGetRecoil(isMeetingEditorRoleState);
  const accountType = await promiseGetRecoil(accountTypeState);
  const appLang = await promiseGetRecoil(appLangState);

  await removeSourcesOutdatedRecords();

  if (accountType === 'vip' && isMeetingEditor) {
    await checkCurrentWeek();
  }

  handleAppChangeLanguage(appLang);
};

export const runUpdater = async () => {
  await updateWeekType();
  await updateAssignmentType();
};

export const userLogoutSuccess = async () => {
  const language = await promiseGetRecoil(appLangState);

  await userSignOut();
  await disconnectCongAccount();
  await displaySnackNotification({
    message: getTranslation({ key: 'logoutSuccess', language }),
  });
};
