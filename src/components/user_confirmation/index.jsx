import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useUserConfirmation from './useUserConfirmation';

const UserConfirmation = () => {
  const { t } = useAppTranslation();

  const { title, message, open, handleConfirm, isProcessing, handleClose } = useUserConfirmation();

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-close-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-close-title">{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={isProcessing} onClick={handleClose}>
            {t('no')}
          </Button>
          <Button
            disabled={isProcessing}
            onClick={handleConfirm}
            endIcon={isProcessing ? <CircularProgress size={25} /> : null}
          >
            {t('yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserConfirmation;
