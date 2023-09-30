import { promiseSetRecoil } from 'recoil-outside';
import Dexie from 'dexie';
import { appDb } from '.';
import {
  apiHostState,
  appMessageState,
  appSeverityState,
  appSnackOpenState,
  congAccountConnectedState,
  isAccountChooseState,
  isAppLoadState,
  isOnlineState,
  isPrecachedState,
  isSetupState,
  isUnauthorizedRoleState,
  rootModalOpenState,
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

export const setIsPrecached = async () => {
  await promiseSetRecoil(isPrecachedState, false);
};

export const setIsAccountChoose = async (value) => {
  await promiseSetRecoil(isAccountChooseState, value);
};

export const setIsUnauthorizedRole = async (value) => {
  await promiseSetRecoil(isUnauthorizedRoleState, value);
};

export const setRootModalOpen = async (value) => {
  await promiseSetRecoil(rootModalOpenState, value);
};

export const setIsSetup = async (value) => {
  await promiseSetRecoil(isSetupState, value);
};

export const setCongAccountConnected = async (value) => {
  await promiseSetRecoil(congAccountConnectedState, value);
};

export const setIsAppLoad = async (value) => {
  await promiseSetRecoil(isAppLoadState, value);
};
