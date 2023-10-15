import { personsSearchableState } from '@states/persons';
import { useRecoilValue } from 'recoil';

const useLocalRecord = ({ member }) => {
  const persons = useRecoilValue(personsSearchableState);

  const value = persons.find((person) => person.person_uid === member.user_local_uid) || null;

  return { value, persons };
};

export default useLocalRecord;
