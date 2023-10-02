import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useFieldServiceReports from './useFieldServiceReports';

const FieldServiceReports = () => {
  const { t } = useAppTranslation();

  const { openPending } = useFieldServiceReports();

  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <FactCheckIcon color="success" />
      <Box>
        <Typography>{t('pendingFieldServiceReportsNew')}</Typography>
        <Button sx={{ marginTop: '8px' }} variant="outlined" color="success" onClick={openPending}>
          {t('review')}
        </Button>
      </Box>
    </Box>
  );
};

export default FieldServiceReports;
