import { getI18n } from 'react-i18next';
import { SongType } from '@definition/songs';

export const songsBuildList = (language: string) => {
  const resource = getI18n().options.resources[language];

  if (!resource) return [];

  const translations = resource.songs;

  const result: SongType[] = [];
  for (const [key, value] of Object.entries(translations)) {
    const number = +key.split('_')[2];

    result.push({
      song_number: number,
      song_title: value,
    });
  }

  return result;
};
