import { useRecoilState, useRecoilValue } from 'recoil';
import { appMessageState, appSeverityState, appSnackOpenState } from '@states/app';

const useNotification = () => {
  const [appSnackOpen, setAppSnackOpen] = useRecoilState(appSnackOpenState);
  const appSeverity = useRecoilValue(appSeverityState);
  const appMessage = useRecoilValue(appMessageState);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAppSnackOpen(false);
  };

  return { appSnackOpen, appSeverity, appMessage, handleClose };
};

export default useNotification;
