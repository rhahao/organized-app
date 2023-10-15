import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { congIDState } from '@states/app';
import { apiFetchCongregationUsers } from '@services/api/congregation';
import { useAppTranslation } from '@hooks/index';
import { displaySnackNotification, setIsCongPersonAdd } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';

const useUsers = () => {
  const { t } = useAppTranslation();

  const congID = useRecoilValue(congIDState);

  const [isProcessing, setIsProcessing] = useState(true);
  const [members, setMembers] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['congPersons'],
    queryFn: apiFetchCongregationUsers,
    enabled: congID.length > 0,
  });

  const handleAddMember = () => {
    setIsCongPersonAdd(true);
  };

  useEffect(() => {
    if (data) {
      const tempData1 = data.data.reduce((group, person) => {
        const { global_role } = person;
        group[global_role] = group[global_role] ?? [];
        group[global_role].push(person);
        return group;
      }, {});

      const tempData2 = [];
      Object.keys(tempData1).forEach(function (key) {
        const obj = {
          global_role: key,
          persons: tempData1[key],
          label: key === 'vip' ? t('vipUsersHeading') : t('pocketUsersHeading'),
        };

        tempData2.push(obj);
      });

      tempData2.sort((a, b) => {
        return a.label > b.label ? 1 : -1;
      });

      setMembers(tempData2);
    }
  }, [data, t]);

  useEffect(() => {
    setIsProcessing(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const displayError = async () => {
      await displaySnackNotification({
        message: getMessageByCode(error),
        severity: 'error',
      });
    };

    if (error) {
      displayError();
    }
  }, [error]);

  return { isProcessing, members, handleAddMember };
};

export default useUsers;
