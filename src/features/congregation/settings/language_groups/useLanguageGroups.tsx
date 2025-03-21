import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from '@hooks/index';
import { apiCongregationUsersGet } from '@services/api/congregation';
import {
  languageGroupEnabledState,
  languageGroupsState,
  userDataViewState,
} from '@states/settings';
import { congAccountConnectedState, congregationUsersState } from '@states/app';

const useLanguageGroups = () => {
  const { isAdmin } = useCurrentUser();

  const isConnected = useRecoilValue(congAccountConnectedState);
  const dataView = useRecoilValue(userDataViewState);

  const { data: users } = useQuery({
    queryKey: ['congregation_users'],
    queryFn: apiCongregationUsersGet,
    refetchOnMount: 'always',
    enabled: isConnected && isAdmin,
  });

  const setUsers = useSetRecoilState(congregationUsersState);

  const enabled = useRecoilValue(languageGroupEnabledState);
  const languageGroups = useRecoilValue(languageGroupsState);

  const fullAccess = useMemo(() => {
    return dataView === 'main';
  }, [dataView]);

  const [isAdd, setIsAdd] = useState(false);

  const handleOpenAdd = () => setIsAdd(true);

  const handleCloseAdd = () => setIsAdd(false);

  useEffect(() => {
    if (users && Array.isArray(users)) {
      setUsers(users);
    }
  }, [setUsers, users]);

  return {
    enabled,
    isAdd,
    handleOpenAdd,
    handleCloseAdd,
    languageGroups,
    fullAccess,
  };
};

export default useLanguageGroups;
