import { promiseSetRecoil } from 'recoil-outside';
import { isPublishOpenState } from '@states/schedules';

export const setPublishPocket = async (value) => {
  await promiseSetRecoil(isPublishOpenState, value);
};
