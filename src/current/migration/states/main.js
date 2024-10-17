import { atom } from 'recoil';

export const isPrecachedCPEState = atom({
  key: 'isPrecachedCPE',
  default: false,
});

export const showReloadCPEState = atom({
  key: 'showReloadCPE',
  default: false,
});

export const appSnackOpenCPEState = atom({
  key: 'appSnackOpenCPE',
  default: false,
});

export const appSeverityCPEState = atom({
  key: 'appSeverityCPE',
  default: 'success',
});

export const appMessageCPEState = atom({
  key: 'appMessageCPE',
  default: '',
});
