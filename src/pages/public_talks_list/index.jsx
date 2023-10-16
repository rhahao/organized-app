import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Typography from '@mui/material/Typography';
import { PublicTalkContainer, PublicTalkPagination } from '@features/index';
import { WaitingCircular } from '@components/index';
import useTalksList from './useTalksList';
import { useAppTranslation } from '@hooks/index';

const PublicTalksList = () => {
  const { t } = useAppTranslation();

  const { congAccountConnected, handleChangePage, handleDownloadTalks, isProcessing, page, publicTalks } =
    useTalksList();

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', maxWidth: '900px' }}>
        <Typography sx={{ marginBottom: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {t('publicTalksList')}
        </Typography>

        {congAccountConnected && (
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            onClick={handleDownloadTalks}
            disabled={isProcessing}
          >
            {t('download')}
          </Button>
        )}
      </Box>

      <Box sx={{ maxWidth: '900px' }}>
        {!isProcessing && publicTalks.length > 0 && (
          <PublicTalkPagination count={publicTalks.length} page={page} handleChangePage={handleChangePage} />
        )}

        <Box sx={{ margin: '10px 0 20px 0' }}>
          {isProcessing && <WaitingCircular />}
          {!isProcessing && publicTalks.length > 0 && <PublicTalkContainer currentPage={page} />}
          {!isProcessing && publicTalks.length === 0 && (
            <Typography sx={{ marginTop: '20px' }}>{t('downloadPublicTalks')}</Typography>
          )}
        </Box>

        {!isProcessing && publicTalks.length > 0 && (
          <PublicTalkPagination count={publicTalks.length} page={page} handleChangePage={handleChangePage} />
        )}
      </Box>
    </Box>
  );
};

export default PublicTalksList;
