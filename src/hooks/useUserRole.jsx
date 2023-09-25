import { useRecoilValue } from 'recoil';
import {
  adminRoleState,
  coordinatorRoleState,
  elderLocalRoleState,
  elderRoleState,
  lmmoRoleState,
  msRoleState,
  publicTalkCoordinatorRoleState,
  publisherRoleState,
  secretaryRoleState,
} from '../states/congregation';

const useUserRole = () => {
  const adminRole = useRecoilValue(adminRoleState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const elderRole = useRecoilValue(elderRoleState);
  const elderLocalRole = useRecoilValue(elderLocalRoleState);
  const msRole = useRecoilValue(msRoleState);
  const publisherRole = useRecoilValue(publisherRoleState);
  const fullMeetingEditor = lmmoRole && coordinatorRole && publicTalkCoordinatorRole;

  return {
    adminRole,
    lmmoRole,
    secretaryRole,
    coordinatorRole,
    publicTalkCoordinatorRole,
    elderRole,
    elderLocalRole,
    msRole,
    publisherRole,
    fullMeetingEditor,
  };
};

export default useUserRole;
