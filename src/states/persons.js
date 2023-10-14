/*
This file holds the source of the truth from the table "persons".
*/
import { atom, selector } from 'recoil';
import { personsFilter } from '@services/cpe/persons';

export const personsState = atom({
  key: 'persons',
  default: [],
});

export const personsActiveState = selector({
  key: 'personsActive',
  get: ({ get }) => {
    const persons = get(personsState);

    return persons.filter((person) => !person.is_deleted);
  },
});

export const isPersonDeleteState = atom({
  key: 'isPersonDelete',
  default: false,
});

export const selectedPersonState = atom({
  key: 'selectedPerson',
  default: {},
});

export const personsSearchKeyState = atom({
  key: 'personsSearchKey',
  default: '',
});

export const personsFilteredState = selector({
  key: 'personsFiltered',
  get: async ({ get }) => {
    const persons = get(personsActiveState);
    const search = get(personsSearchKeyState);

    const result = await personsFilter({ persons, data: { txtSearch: search } });
    return result;
  },
});
