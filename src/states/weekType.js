/*
This file holds the source of the truth from the table "week_type".
*/

import { atom } from 'recoil';

export const weekTypeState = atom({
  key: 'weekType',
  default: [],
});
