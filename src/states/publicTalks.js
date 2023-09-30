/*
This file holds the source of the truth from the table "public_talks".
*/

import { atom } from 'recoil';

export const publicTalksState = atom({
  key: 'publicTalks',
  default: [],
});
