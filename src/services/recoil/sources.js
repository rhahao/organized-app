import { promiseSetRecoil } from 'recoil-outside';
import { epubFileState, isImportEPUBState, isImportJWOrgState } from '@states/sources';

export const setEpubFile = async (value) => {
  await promiseSetRecoil(epubFileState, value);
};

export const setIsImportEPUB = async (value) => {
  await promiseSetRecoil(isImportEPUBState, value);
};

export const setIsImportJWOrg = async (value) => {
  await promiseSetRecoil(isImportJWOrgState, value);
};
