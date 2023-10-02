import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useImportJWOrg from './useImportJWOrg';

const sharedStyles = {
  jwLoad: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
  textCircular: {
    marginTop: '20px',
  },
};

const ImportJWOrg = () => {
  const { t } = useAppTranslation();

  const { open, isLoading, handleDlgClose, isOnline } = useImportJWOrg();

  return (
    <Box>
      {open && isOnline && (
        <Dialog open={open} onClose={handleDlgClose}>
          <DialogTitle>
            <Typography sx={{ lineHeight: 1.2, fontSize: '13px' }}>{t('importJwTitle')}</Typography>
          </DialogTitle>
          <DialogContent>
            <Container sx={sharedStyles.jwLoad}>
              {isLoading && (
                <>
                  <CircularProgress color="secondary" size={'70px'} disableShrink />
                  <Typography variant="body1" align="center" sx={sharedStyles.textCircular}>
                    {t('downloadInProgress')}
                  </Typography>
                </>
              )}
              {!isLoading && (
                <>
                  <CheckCircleIcon color="success" sx={{ fontSize: '100px' }} />
                  <Typography variant="body1" align="center" sx={sharedStyles.textCircular}>
                    {t('importCompleted')}
                  </Typography>
                </>
              )}
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDlgClose} color="primary" autoFocus disabled={isLoading}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ImportJWOrg;
