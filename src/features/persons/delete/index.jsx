import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useDelete from './useDelete';
import { useAppTranslation } from '@hooks/index';

const PersonDelete = () => {
  const { t } = useAppTranslation();

  const { open, name, handleDelete, handleClose } = useDelete();

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box sx={{ lineHeight: 1.2 }}>{t('deleteTitle', { currentStudent: name })}</Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-delete-person-desc">{t('deleteConfirmation')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            {t('delete')}
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonDelete;
