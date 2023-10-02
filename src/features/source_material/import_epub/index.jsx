import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useImportEPUB from './useImportEPUB';

const sharedStyles = {
  epubLoad: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  },
  textCircular: {
    marginTop: '10px',
  },
};

const ImportEPUB = () => {
  const { t } = useAppTranslation();

  const { isComplete, btnDisabled, handleDlgClose, epubValid, epubInvalid, open } = useImportEPUB();

  return (
    <Box>
      {open && (
        <Dialog open={open} onClose={handleDlgClose}>
          <DialogTitle>
            <Typography sx={{ lineHeight: 1.2, fontSize: '13px' }}>{t('importEPUBTitle')}</Typography>
          </DialogTitle>
          <DialogContent>
            {epubInvalid && (
              <Container sx={sharedStyles.epubLoad}>
                <ErrorIcon color="error" sx={{ fontSize: '80px' }} />
                <Typography variant="body1" align="center">
                  {t('epubInvalid')}
                </Typography>
              </Container>
            )}
            {epubValid && (
              <Container sx={sharedStyles.epubLoad}>
                {!isComplete && (
                  <>
                    <CircularProgress color="secondary" size={'70px'} disableShrink />
                    <Typography variant="body1" align="center" sx={sharedStyles.textCircular}>
                      {t('pleaseWait')}
                    </Typography>
                  </>
                )}
                {isComplete && (
                  <>
                    <CheckCircleIcon color="success" sx={{ fontSize: '100px' }} />
                    <Typography variant="body1" align="center" sx={sharedStyles.textCircular}>
                      {t('importCompleted')}
                    </Typography>
                  </>
                )}
              </Container>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDlgClose} color="primary" autoFocus disabled={btnDisabled}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ImportEPUB;
