import { Box, Stack } from '@mui/material';
import { useAppTranslation } from '@hooks/index';
import { ImportExportType } from './index.types';
import useImportExport from './useImportExport';
import ConfirmImport from './confirm_import';
import Dialog from '@components/dialog';
import Typography from '@components/typography';
import Tabs from '@components/tabs';

const ImportExport = (props: ImportExportType) => {
  const { t } = useAppTranslation();

  const { tabs, handleTabChange, value, state, handleOpenImportExport } =
    useImportExport(props);

  return (
    <Dialog onClose={props.onClose} open={props.open} sx={{ padding: '24px' }}>
      {state === 'import/export' && (
        <Stack spacing="16px">
          <Typography className="h2">{t('tr_importExportTitle')}</Typography>

          <Typography color="var(--grey-400)">
            {value === 0 ? t('tr_exportDesc') : t('tr_importDesc')}
          </Typography>

          <Box sx={{ marginBottom: '-24px !important' }}>
            <Tabs tabs={tabs} onChange={handleTabChange} value={value} />
          </Box>
        </Stack>
      )}

      {state === 'import/confirm' && (
        <ConfirmImport
          onBack={handleOpenImportExport}
          onClose={props.onClose}
        />
      )}
    </Dialog>
  );
};

export default ImportExport;
