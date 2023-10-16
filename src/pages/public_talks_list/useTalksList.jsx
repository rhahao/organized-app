import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { publicTalksState } from '@states/publicTalks';
import { congAccountConnectedState } from '@states/app';
import { apiFetchPublicTalks } from '@services/api/sources';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';
import { resetS34s } from '@services/dexie/publicTalks';

const useTalksList = () => {
  const publicTalks = useRecoilValue(publicTalksState);
  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  const [page, setPage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDownloadTalks = async () => {
    try {
      setIsProcessing(true);

      const { status, data } = await apiFetchPublicTalks();

      if (status !== 200) {
        setIsProcessing(false);

        await displaySnackNotification({
          message: getMessageByCode(data.message),
          severity: 'warning',
        });
        return;
      }

      await resetS34s(data);

      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);

      await displaySnackNotification({
        message: getMessageByCode(err.message),
        severity: 'error',
      });
    }
  };

  return { publicTalks, congAccountConnected, page, isProcessing, handleChangePage, handleDownloadTalks };
};

export default useTalksList;
