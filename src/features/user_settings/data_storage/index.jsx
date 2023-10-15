import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteDatabase from './components/DeleteDatabase';
import useDataStorage from './useDataStorage';
import { useAppTranslation } from '@hooks/index';

const DataStorage = () => {
  const { t } = useAppTranslation();

  const {
    approvedRole,
    handleAutoBackupChange,
    handleBackupIntervalChange,
    handleDelete,
    isTmpAutoBackup,
    tmpBackupInterval,
  } = useDataStorage();

  const minLabel = t('minuteShortLabel');

  return (
    <Box>
      <DeleteDatabase />
      <Typography className={'settingHeader'}>{t('dataStorage')}</Typography>
      <Divider sx={{ borderWidth: '5px' }} />
      <Box sx={{ padding: '20px 20px' }}>
        {approvedRole && (
          <Box sx={{ marginBottom: '20px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{t('autoBackup')}</Typography>
            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <FormControlLabel
                control={
                  <Checkbox checked={isTmpAutoBackup} onChange={(e) => handleAutoBackupChange(e.target.checked)} />
                }
                label={t('enableLabel')}
              />
              <TextField
                id="outlined-select-backup-time"
                select
                label={t('backupIntervalLabel')}
                size="small"
                sx={{ minWidth: '130px' }}
                defaultValue={5}
                value={tmpBackupInterval}
                onChange={(e) => handleBackupIntervalChange(e.target.value)}
              >
                {[5, 15, 30, 45].map((time) => (
                  <MenuItem key={time} value={time}>
                    {`${time} ${minLabel}`}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        )}

        <Box>
          <Typography>{t('eraseDesc')}</Typography>
          <Button
            variant="contained"
            color="error"
            className={'btnSubItem'}
            startIcon={<DeleteForeverIcon />}
            onClick={handleDelete}
            sx={{ marginTop: '10px' }}
          >
            {t('delete')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataStorage;
