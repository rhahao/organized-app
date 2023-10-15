import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetchPocketSessions } from '@services/api/user';
import { displaySnackNotification, setRootModalOpen } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';

const useSessions = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: apiFetchPocketSessions,
  });

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (data) {
      setSessions(data);
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

  return { sessions };
};

export default useSessions;
