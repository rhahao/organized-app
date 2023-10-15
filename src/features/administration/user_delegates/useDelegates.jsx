import { useQueryClient } from '@tanstack/react-query';

const useDelegates = ({ person, member }) => {
  const queryClient = useQueryClient();
  const congPersonsQuery = queryClient.getQueryData(['congPersons']);

  const options = congPersonsQuery?.data || [];

  let pocketOptions = person ? options.filter((record) => record.user_local_uid !== person.user_local_uid) : [];
  pocketOptions = pocketOptions.map((record) => {
    return { user_local_uid: record.user_local_uid, username: record.username };
  });

  const value = member.user_members_delegate.map((selected) => {
    return { ...pocketOptions.find((record) => selected.person_uid === record.user_local_uid) };
  });

  return { value, pocketOptions };
};

export default useDelegates;
