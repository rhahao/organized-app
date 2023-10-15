import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { personsSearchableState } from '@states/persons';

const useUserRoles = ({ member, handleCheckViewMeetingSchedule }) => {
  const isRoleCheckerRan = useRef();

  isRoleCheckerRan.current = false;

  const persons = useRecoilValue(personsSearchableState);

  const [disableViewMeetingRole, setDisableViewMeetingRole] = useState(true);

  const currentPerson = persons.find((person) => person.person_uid === member.user_local_uid);
  const isElder = currentPerson?.isElder;
  const isMS = currentPerson?.isMS;
  const isPublisher = currentPerson?.isPublisher;

  const secretaryRole = member.cong_role.includes('secretary');
  const lmmoRole = member.cong_role.includes('lmmo') || member.cong_role.includes('lmmo-backup');
  const coordinatorRole = member.cong_role.includes('coordinator');
  const publicTalkCoordinatorRole = member.cong_role.includes('public_talk_coordinator');
  const publisherRole = member.cong_role.includes('publisher');
  const msRole = member.cong_role.includes('ms');
  const elderRole = member.cong_role.includes('elder');

  const bronzeRole =
    secretaryRole || lmmoRole || coordinatorRole || publicTalkCoordinatorRole || publisherRole || msRole || elderRole;

  useEffect(() => {
    if (!isRoleCheckerRan.current) {
      setDisableViewMeetingRole(false);

      if (bronzeRole || isElder || isMS || isPublisher) {
        handleCheckViewMeetingSchedule(false);
        setDisableViewMeetingRole(true);
      }
    }

    return () => {
      isRoleCheckerRan.current = true;
    };
  }, [handleCheckViewMeetingSchedule, bronzeRole, isElder, isMS, isPublisher]);

  return { disableViewMeetingRole };
};

export default useUserRoles;
