/*
This file holds the source of the truth from the table "sched".
*/

import memoize from 'fast-memoize';
import { atom, selector } from 'recoil';

export const schedulesState = atom({
  key: 'schedules',
  default: [],
});

export const scheduleByWeek = memoize((weekOf) =>
  selector({
    key: `weekOf-${weekOf}`,
    get: ({ get }) => {
      const schedules = get(schedulesState);
      const schedule = schedules.find((record) => record.weekOf === weekOf);

      return schedule;
    },
  })
);

export const isPublishOpenState = atom({
  key: 'isPublishOpen',
  default: false,
});
