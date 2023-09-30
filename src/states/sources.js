/*
This file holds the source of the truth from the table "sources".
*/

import memoize from 'fast-memoize';
import { atom, selector } from 'recoil';

export const sourcesState = atom({
  key: 'sources',
  default: [],
});

export const sourceByWeek = memoize((weekOf) =>
  selector({
    key: `weekOf-${weekOf}`,
    get: ({ get }) => {
      const sources = get(sourcesState);
      const source = sources.find((record) => record.weekOf === weekOf);

      return source;
    },
  })
);
