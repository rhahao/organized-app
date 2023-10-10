import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  coordinatorRoleState,
  lmmoRoleState,
  publicTalkCoordinatorRoleState,
  secretaryRoleState,
} from '@states/settings';
import { setCurrentPerson, setIsPersonDelete } from '@services/recoil/persons';
import femaleIcon from '@assets/img/person_female.svg';
import maleIcon from '@assets/img/person_male.svg';
import { useMemo } from 'react';
import {
  personIsAuxiliaryPioneer,
  personIsBaptized,
  personIsElder,
  personIsMS,
  personIsPublisher,
  personIsRegularPioneer,
  personIsSpecialPioneer,
} from '@services/dexie/persons';

const useCard = (person) => {
  const navigate = useNavigate();

  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);
  const publicTalkCoordinatorRole = useRecoilValue(publicTalkCoordinatorRoleState);
  const coordinatorRole = useRecoilValue(coordinatorRoleState);

  const isPersonEditor = lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole;

  const isPublisher = useMemo(async () => await personIsPublisher(person.person_uid), [person.person_uid]);
  const isAuxiliaryPioneer = useMemo(
    async () => await personIsAuxiliaryPioneer(person.person_uid),
    [person.person_uid]
  );
  const isRegularPioneer = useMemo(async () => await personIsRegularPioneer(person.person_uid), [person.person_uid]);
  const isSpecialPioneer = useMemo(async () => await personIsSpecialPioneer(person.person_uid), [person.person_uid]);
  const isBaptized = useMemo(async () => await personIsBaptized(person.person_uid), [person.person_uid]);
  const isMS = useMemo(async () => await personIsMS(person.person_uid), [person.person_uid]);
  const isElder = useMemo(async () => await personIsElder(person.person_uid), [person.person_uid]);

  const handleOpenPerson = () => {
    navigate(`/persons/${person.person_uid}`);
  };

  const handleDelete = (person) => {
    const obj = {};
    obj.person_name = person.person_name;
    obj.person_uid = person.person_uid;

    setCurrentPerson(obj);
    setIsPersonDelete(true);
  };

  return {
    isPersonEditor,
    handleOpenPerson,
    handleDelete,
    femaleIcon,
    maleIcon,
    isPublisher,
    isAuxiliaryPioneer,
    isRegularPioneer,
    isSpecialPioneer,
    isBaptized,
    isMS,
    isElder,
  };
};

export default useCard;
