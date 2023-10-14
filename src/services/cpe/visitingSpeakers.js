import { promiseGetRecoil } from 'recoil-outside';
import { visitingSpeakersListState } from '@states/visitingSpeakers';

export const getVisitingSpeakerByUID = async (speaker_uid) => {
  const visitingSpeakers = await promiseGetRecoil(visitingSpeakersListState);
  return visitingSpeakers.find((speaker) => speaker.person_uid === speaker_uid);
};
