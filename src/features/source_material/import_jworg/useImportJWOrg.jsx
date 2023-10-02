import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { apiHostState, isOnlineState } from '@states/app';
import { isImportJWOrgState } from '@states/sources';
import { setIsImportJWOrg } from '@services/recoil/sources';
import { apiFetchSources } from '@services/api/sources';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { addJwDataToDb } from '@services/cpe/sources';

const useImportJWOrg = () => {
  const cancel = useRef();

  const apiHost = useRecoilValue(apiHostState);
  const isOnline = useRecoilValue(isOnlineState);
  const open = useRecoilValue(isImportJWOrgState);

  const [isLoading, setIsLoading] = useState(true);

  const handleDlgClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }
    setIsImportJWOrg(false);
  };

  const fetchSourcesJw = useCallback(async () => {
    try {
      if (isOnline && apiHost !== '') {
        cancel.current = false;

        const { status, data } = await apiFetchSources();

        if (!cancel.current) {
          if (status === 200 && data && data.length > 0) {
            await addJwDataToDb(data);
            setIsLoading(false);
            return;
          }

          await displaySnackNotification({
            message: getMessageByCode('sourceNotFoundUnavailable'),
            severity: 'warning',
          });

          setIsImportJWOrg(false);
        }
      }
    } catch (err) {
      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });

      setIsImportJWOrg(false);
    }
  }, [apiHost, isOnline]);

  useEffect(() => {
    fetchSourcesJw();
  }, [fetchSourcesJw]);

  useEffect(() => {
    return () => {
      cancel.current = true;
    };
  }, []);

  return { open, isLoading, handleDlgClose, isOnline };
};

export default useImportJWOrg;
