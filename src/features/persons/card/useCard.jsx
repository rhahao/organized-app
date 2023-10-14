import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { personEditorRoleState } from '@states/settings';
import { setCurrentPerson, setIsPersonDelete } from '@services/recoil/persons';
import femaleIcon from '@assets/img/person_female.svg';
import maleIcon from '@assets/img/person_male.svg';

const useCard = (person) => {
  const navigate = useNavigate();

  const isPersonEditor = useRecoilValue(personEditorRoleState);

  const isBR = person.assignments.find((assignment) => assignment.code === 100);
  const isIC = person.assignments.find((assignment) => assignment.code === 101);
  const isRV = person.assignments.find((assignment) => assignment.code === 102);
  const isBS = person.assignments.find((assignment) => assignment.code === 103);
  const isT = person.assignments.find((assignment) => assignment.code === 104);
  const isDisqualified = person.isDisqualified;
  const isPublisher = person.isPublisher;
  const isAuxiliaryPioneer = person.isAuxP;
  const isRegularPioneer = person.isFR;
  const isSpecialPioneer = person.isSFTS;
  const isBaptized = person.isBaptized;
  const isMS = person.isMS;
  const isElder = person.isElder;

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
    isDisqualified,
  };
};

export default useCard;
