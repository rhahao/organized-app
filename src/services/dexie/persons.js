import { promiseGetRecoil } from 'recoil-outside';
import appDb from './db';
import { comparePerson } from '@services/cpe/persons';
import { personsState } from '@states/persons';

export const resetPersons = async (cong_persons) => {
  await appDb.persons.clear();

  for await (const person of cong_persons) {
    await appDb.persons.put(person);
  }
};

export const savePerson = async (data) => {
  const { person_uid, person_name, person_displayName } = data;

  if (person_name && person_displayName) {
    if (person_uid) {
      const persons = await promiseGetRecoil(personsState);
      const currentPerson = persons.find((person) => person.person_uid === data.person_uid);
      const newPerson = structuredClone(currentPerson);

      if (!data.isMoved) {
        newPerson.changes = comparePerson(newPerson, data);
        newPerson.changes = data.changes.filter((item) => item.field !== 'lastAssignment');
      }

      await appDb.persons.put(newPerson);
    }

    if (!person_uid) {
      const newPerson = {
        person_uid: window.crypto.randomUUID(),
        isMoved: false,
        isDisqualified: false,
        ...data,
      };

      await appDb.persons.put(newPerson);
    }

    return true;
  } else {
    return false;
  }
};

export const deletePerson = async (uid) => {
  const oldPersons = await promiseGetRecoil(personsState);
  const persons = structuredClone(oldPersons);

  const person = persons.find((p) => p.person_uid === uid);

  if (person) {
    person.is_deleted = true;

    await appDb.persons.put(person);
  }
};
