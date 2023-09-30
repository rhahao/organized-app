/*
This file holds the source of the truth from the table "announcements".
*/

import { atom } from 'recoil';

export const announcementsState = atom({
  key: 'announcements',
  default: [],
});
