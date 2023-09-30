import { isPrecachedState, showReloadState } from '@states/app';
import { promiseSetRecoil } from 'recoil-outside';
import logger from '@services/logger';

export const handleSWOnInstalled = async () => {
  await promiseSetRecoil(isPrecachedState, true);
  logger.info('service-worker', 'the service worker was installed and ready for use');
};

export const handleSWOnUpdated = async () => {
  await promiseSetRecoil(showReloadState, true);
  logger.info('service-worker', 'an updated service worker is ready to be used');
};
