import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import useRestore from './useRestore';
import { useAppTranslation } from '@hooks/index';

const RestoreDbDialog = () => {
  const { t } = useAppTranslation();

  const { handleClose, hasBackup, isProcessing, open, lastBackupDate, noBackupLabel, handleRestoreBackup } =
    useRestore();

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('restoreBackup')}</DialogTitle>
        <DialogContent sx={{ minWidth: '380px' }}>
          {isProcessing && (
            <CircularProgress
              color="secondary"
              size={80}
              disableShrink={true}
              sx={{
                display: 'flex',
                margin: '10px auto',
              }}
            />
          )}
          {!isProcessing && (
            <>
              {hasBackup && <Typography>{lastBackupDate}</Typography>}
              {!hasBackup && <Typography>{noBackupLabel}</Typography>}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleRestoreBackup} disabled={isProcessing} color="primary">
            {t('restore')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestoreDbDialog;
