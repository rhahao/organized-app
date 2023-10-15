import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useAdministration from './useAdministration';
import { CongregationCreateUser, CongregationUsers } from '@features/index';
import { useAppTranslation } from '@hooks/index';

const Administration = () => {
  const { t } = useAppTranslation();

  const { isCongPersonAdd } = useAdministration();

  return (
    <Box>
      <Typography sx={{ margin: '0px 0px 20px 0px', textTransform: 'uppercase', fontWeight: 'bold' }}>
        {t('heading')}
      </Typography>

      {isCongPersonAdd && <CongregationCreateUser />}

      <CongregationUsers />
    </Box>
  );
};

export default Administration;
