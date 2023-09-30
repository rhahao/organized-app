/*
This file holds the source of the truth from the table "assignment".
*/

import { atom } from 'recoil';

export const assignmentState = atom({
  key: 'assignment',
  default: [],
});
