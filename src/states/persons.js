/*
This file holds the source of the truth from the table "persons".
*/

import { atom } from 'recoil';

export const personsState = atom({
  key: 'persons',
  default: [],
});
