import { promiseGetRecoil } from 'recoil-outside';
import { apiHostState, appLangState, visitorIDState } from '@states/app';
import { currentAuthUser, userSignOut } from '@services/firebase/auth';
import { disconnectCongAccount, displaySnackNotification } from '@services/dexie/app';
import { getTranslation } from '@services/i18n/translation';

const apiDefault = async () => {
  const apiHost = await promiseGetRecoil(apiHostState);
  const visitorID = await promiseGetRecoil(visitorIDState);
  const appVersion = import.meta.env.PACKAGE_VERSION;
  const appLang = await promiseGetRecoil(appLangState);

  const userUID = currentAuthUser.uid;

  return { apiHost, visitorID, appVersion, userUID, appLang };
};

export const apiUserLogout = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, appLang: language } = await apiDefault();

  await fetch(`${apiHost}api/users/logout`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid: uid },
  });

  await userSignOut();
  await disconnectCongAccount();
  await displaySnackNotification({
    message: getTranslation({ key: 'logoutSuccess', language }),
  });
};
