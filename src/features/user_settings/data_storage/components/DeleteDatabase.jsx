import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isDeleteDbOpenState } from '@states/app';
import { useAppTranslation } from '@hooks/index';
import { lmmoRoleState, secretaryRoleState } from '@states/settings';
import { handleDeleteDatabase } from '@services/cpe';

const DeleteDatabase = () => {
  const { t } = useAppTranslation();

  const [open, setOpen] = useRecoilState(isDeleteDbOpenState);
  const lmmoRole = useRecoilValue(lmmoRoleState);
  const secretaryRole = useRecoilValue(secretaryRoleState);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('deleteDbTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {lmmoRole || secretaryRole ? t('deleteDbDesc') : t('deleteDbNoRecordDesc')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleDeleteDatabase} color="primary" autoFocus>
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDatabase;
