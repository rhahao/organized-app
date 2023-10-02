import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { epubFileState, isImportEPUBState } from '@states/sources';
import { setEpubFile, setIsImportEPUB } from '@services/recoil/sources';
import { addEpubDataToDb } from '@services/cpe/sources';
import { displaySnackNotification } from '@services/recoil/app';
import { getMessageByCode } from '@services/i18n/translation';

let importRan = false;

const useImportEPUB = () => {
  const open = useRecoilValue(isImportEPUBState);
  const fileEPUB = useRecoilValue(epubFileState);

  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const epubInvalid = !isLoading && !isValid;
  const epubValid = !isLoading && isValid;

  const handleDlgClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }

    setIsImportEPUB(false);
  };

  useEffect(() => {
    const loadEPUB = async () => {
      try {
        setIsLoading(false);
        const result = await addEpubDataToDb(fileEPUB);
        if (result === 'error') {
          setIsValid(false);
        } else {
          setIsComplete(true);
          setEpubFile(undefined);
        }
        importRan = false;
        setBtnDisabled(false);
      } catch (err) {
        await displaySnackNotification({
          message: getMessageByCode(err.message),
          severity: 'error',
        });

        setIsImportEPUB(false);
      }
    };

    if (!importRan && open && fileEPUB) {
      loadEPUB();
      importRan = true;
    }
  }, [open, fileEPUB]);

  return { isComplete, btnDisabled, handleDlgClose, epubValid, epubInvalid, open };
};

export default useImportEPUB;
