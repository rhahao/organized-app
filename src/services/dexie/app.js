import { promiseSetRecoil } from 'recoil-outside';
import Dexie from 'dexie';
import appDb from '.';
import {
  apiHostState,
  appMessageState,
  appSeverityState,
  appSnackOpenState,
  congAccountConnectedState,
  isOnlineState,
  visitorIDState,
} from '@states/app';

export const deleteAppDb = async () => {
  await appDb.close();
  await Dexie.delete('cpe_sws');
};

export const disconnectCongAccount = async () => {
  await promiseSetRecoil(congAccountConnectedState, false);
};

export const displaySnackNotification = async ({ message, severity }) => {
  await promiseSetRecoil(appMessageState, message);
  await promiseSetRecoil(appSeverityState, severity);
  await promiseSetRecoil(appSnackOpenState, true);
};

export const setApiHost = async (value) => {
  await promiseSetRecoil(apiHostState, value);
};

export const setVisitorID = async (value) => {
  await promiseSetRecoil(visitorIDState, value);
};

export const setIsOnline = async (value) => {
  await promiseSetRecoil(isOnlineState, value);
};
