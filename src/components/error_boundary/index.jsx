import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppNavBar } from '@layouts/index';
import { useAppTranslation } from '@hooks';
import useError from './useError';

const ErrorBoundary = () => {
  const { error, handleReload, handleDelete } = useError();

  const { t } = useAppTranslation();

  return (
    <>
      <AppNavBar />
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '750px',
          padding: '10px',
          marginTop: '60px',
        }}
      >
        <Typography>Ooops</Typography>
        <Typography>{error.message || error.data}</Typography>
        <Typography sx={{ marginTop: '15px' }}>{t('errorReloadCPE')}</Typography>
        <Button variant="contained" color="info" sx={{ marginTop: '10px' }} onClick={handleReload}>
          {t('reloadApp')}
        </Button>
        <Typography sx={{ marginTop: '15px' }} color="error">
          {t('errorResetData')}
        </Typography>
        <Button variant="contained" color="error" sx={{ marginTop: '10px' }} onClick={handleDelete}>
          {t('reset')}
        </Button>
      </Box>
    </>
  );
};

export default ErrorBoundary;
