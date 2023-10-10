import { useRecoilValue } from 'recoil';
import { deletePerson } from '@services/dexie/persons';
import { setIsPersonDelete } from '@services/recoil/persons';
import { isPersonDeleteState, selectedPersonState } from '@states/persons';
import { displaySnackNotification } from '@services/recoil/app';
import { useAppTranslation } from '@hooks/index';

const useDelete = () => {
  const { t } = useAppTranslation();

  const open = useRecoilValue(isPersonDeleteState);
  const selectedPerson = useRecoilValue(selectedPersonState);

  const handleDelete = async () => {
    await deletePerson(selectedPerson.person_uid);
    setIsPersonDelete(false);

    await displaySnackNotification({
      message: t('deleteSucess'),
      severity: 'success',
    });
  };

  const handleClose = () => {
    setIsPersonDelete(false);
  };

  return { open, name: selectedPerson.person_name, handleDelete, handleClose };
};

export default useDelete;
