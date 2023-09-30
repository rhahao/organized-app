import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useNotification from './useNotification';

const NotificationWrapper = () => {
  const { appMessage, appSeverity, appSnackOpen, handleClose } = useNotification();

  return (
    <>
      {appSnackOpen && appMessage && (
        <Snackbar
          open={appSnackOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert variant="filled" onClose={handleClose} severity={appSeverity}>
            {appMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationWrapper;
