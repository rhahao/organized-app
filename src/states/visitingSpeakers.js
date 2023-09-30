/*
This file holds the source of the truth from the table "visiting_speakers".
*/

import { atom } from 'recoil';

export const visitingSpeakersState = atom({
  key: 'visitingSpeakers',
  default: [],
});
