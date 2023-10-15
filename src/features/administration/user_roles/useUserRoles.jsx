import { personsSearchableState } from '@states/persons';
import { lmmoRoleState, secretaryRoleState } from '@states/settings';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

let isRoleCheckerRan = false;

const useUserRoles = ({ member, handleCheckViewMeetingSchedule }) => {
  const persons = useRecoilValue(personsSearchableState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const lmmoRole = useRecoilValue(lmmoRoleState);

  const [disableViewMeetingRole, setDisableViewMeetingRole] = useState(false);

  useEffect(() => {
    if (!isRoleCheckerRan) {
      setDisableViewMeetingRole(false);

      if (member.cong_role) {
        const currentPerson = persons.find((person) => person.person_uid === member.user_local_uid);
        const isElder = currentPerson?.isElder();
        const isMS = currentPerson?.isMS();
        const isPublisher = currentPerson?.isPublisher();

        if (secretaryRole || lmmoRole || isElder || isMS || isPublisher) {
          handleCheckViewMeetingSchedule(false);
          setDisableViewMeetingRole(true);
        }

        isRoleCheckerRan = true;
      }
    }
  }, [member.cong_role, member.user_local_uid, handleCheckViewMeetingSchedule, persons, secretaryRole, lmmoRole]);

  return { disableViewMeetingRole };
};

export default useUserRoles;
