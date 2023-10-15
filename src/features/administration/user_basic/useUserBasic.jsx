import { useRecoilValue } from 'recoil';
import { personsSearchableState } from '@states/persons';

const useUserBasic = ({ person }) => {
  const persons = useRecoilValue(personsSearchableState);

  const currentPerson = persons.find((p) => p.person_uid === person.user_local_uid);

  const isElder = currentPerson?.isElder;
  const isMS = currentPerson?.isMS;
  const isPublisher = currentPerson?.isPublisher;

  return { isElder, isMS, isPublisher };
};

export default useUserBasic;
