import { promiseGetRecoil } from 'recoil-outside';
import { publicTalksState } from '@states/publicTalks';
import { appLangState } from '@states/app';

export const publicTalksLocale = async () => {
  const talks = await promiseGetRecoil(publicTalksState);
  const lang = await promiseGetRecoil(appLangState);

  const result = [];
  for (const talk of talks) {
    result.push({
      talk_number: talk.talk_number,
      talk_title: talk.talk_title[lang]?.title || '',
      talk_modified: talk.talk_title[lang]?.modified || '',
    });
  }

  return result;
};

export const publicTalkFindLocal = async (talk_number) => {
  const talks = await publicTalksLocale();
  const found = talks.find((talk) => talk.talk_number === talk_number);
  return found.talk_title;
};
