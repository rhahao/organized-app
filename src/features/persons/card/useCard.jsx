import { useEffect, useState } from 'react';
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

  const [isPublisher, setIsPublisher] = useState(false);
  const [isAuxiliaryPioneer, setIsAuxiliaryPioneer] = useState(false);
  const [isRegularPioneer, setIsRegularPioneer] = useState(false);
  const [isSpecialPioneer, setIsSpecialPioneer] = useState(false);
  const [isBaptized, setIsBaptized] = useState(false);
  const [isMS, setIsMS] = useState(false);
  const [isElder, setIsElder] = useState(false);

  const isPersonEditor = lmmoRole || secretaryRole || coordinatorRole || publicTalkCoordinatorRole;
  const isBR = person.assignments.find((assignment) => assignment.code === 100);
  const isIC = person.assignments.find((assignment) => assignment.code === 101);
  const isRV = person.assignments.find((assignment) => assignment.code === 102);
  const isBS = person.assignments.find((assignment) => assignment.code === 103);
  const isT = person.assignments.find((assignment) => assignment.code === 104);
  const isPublisherOnly = isPublisher && !isAuxiliaryPioneer && !isRegularPioneer && !isSpecialPioneer;

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

  useEffect(() => {
    const getPersonBadges = async () => {
      const isPublisher = await personIsPublisher(person.person_uid);
      const isAuxiliaryPioneer = await personIsAuxiliaryPioneer(person.person_uid);
      const isRegularPioneer = await personIsRegularPioneer(person.person_uid);
      const isSpecialPioneer = await personIsSpecialPioneer(person.person_uid);
      const isBaptized = await personIsBaptized(person.person_uid);
      const isMS = await personIsMS(person.person_uid);
      const isElder = await personIsElder(person.person_uid);

      setIsPublisher(isPublisher);
      setIsAuxiliaryPioneer(isAuxiliaryPioneer);
      setIsRegularPioneer(isRegularPioneer);
      setIsSpecialPioneer(isSpecialPioneer);
      setIsBaptized(isBaptized);
      setIsMS(isMS);
      setIsElder(isElder);
    };

    getPersonBadges();
  }, [person.person_uid]);

  return {
    isPersonEditor,
    handleOpenPerson,
    handleDelete,
    femaleIcon,
    maleIcon,
    isAuxiliaryPioneer,
    isRegularPioneer,
    isSpecialPioneer,
    isBaptized,
    isMS,
    isElder,
    isBR,
    isIC,
    isRV,
    isBS,
    isT,
    isPublisherOnly,
  };
};

export default useCard;
