import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useEmailBlocked from './useEmailBlocked';
import { useAppTranslation } from '@hooks';

const EmailBlocked = () => {
  const { t } = useAppTranslation();

  const { handleSignIn } = useEmailBlocked();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('blockedEmailTitle')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '20px',
          margin: '30px 0',
        }}
      >
        <BlockIcon
          color="error"
          sx={{
            fontSize: '60px',
            cursor: 'pointer',
          }}
        />
        <Typography>{t('blockedAccount')}</Typography>
      </Box>

      <Button variant="contained" onClick={handleSignIn}>
        OK
      </Button>
    </Container>
  );
};

export default EmailBlocked;
