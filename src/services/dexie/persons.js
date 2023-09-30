import appDb from './db';

export const resetPersons = async (cong_persons) => {
  await appDb.persons.clear();

  for await (const person of cong_persons) {
    await appDb.persons.add(person);
  }
};
