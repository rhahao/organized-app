/*
This file holds the source of the truth from the table "sched".
*/

import memoize from 'fast-memoize';
import { atom, selector } from 'recoil';
import { getHistoryInfo } from '@services/cpe/schedules';

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

export const assignmentsHistoryState = selector({
  key: 'assignmentsHistory',
  get: async ({ get }) => {
    const schedules = get(schedulesState);

    let result = [];

    for await (const { weekOf } of schedules) {
      const history = await getHistoryInfo(weekOf);
      result = result.concat(history);
    }

    return result;
  },
});
