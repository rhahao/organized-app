import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { apiGetUserSessions } from '@services/api/user';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { userIDState } from '@states/app';
import { getMessageByCode } from '@services/i18n/translation';

const useSessions = () => {
  const userID = useRecoilValue(userIDState);

  const { isLoading, error, data } = useQuery({
    queryKey: ['sessions'],
    queryFn: apiGetUserSessions,
    enabled: userID.length > 0,
  });

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (data) {
      setSessions(data.data);
    }
  }, [data]);

  useEffect(() => {
    const modelState = async () => {
      await setRootModalOpen(isLoading);
    };

    modelState();
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

  return { sessions, setSessions };
};

export default useSessions;
