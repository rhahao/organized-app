import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  userConfirmationActionState,
  userConfirmationMessageState,
  userConfirmationOpenState,
  userConfirmationTitleState,
} from '@states/app';
import { setUserConfirmationOpen } from '@services/recoil/app';
import { handleWeekAddConfirm, handleWeekDeleteConfirm } from '@services/cpe/sources';

const useUserConfirmation = () => {
  const title = useRecoilValue(userConfirmationTitleState);
  const message = useRecoilValue(userConfirmationMessageState);
  const action = useRecoilValue(userConfirmationActionState);
  const open = useRecoilValue(userConfirmationOpenState);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);

    if (action === 'manualWeekAdd') await handleWeekAddConfirm();
    if (action.indexOf('weekDelete-') !== -1) await handleWeekDeleteConfirm();

    setIsProcessing(false);
    setUserConfirmationOpen(false);
  };

  const handleClose = () => {
    setUserConfirmationOpen(false);
  };

  return { title, message, open, handleConfirm, isProcessing, handleClose };
};

export default useUserConfirmation;
