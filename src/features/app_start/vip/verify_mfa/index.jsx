import { MuiOtpInput } from 'mui-one-time-password-input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@hooks/index';
import useVerifyMFA from './useVerifyMFA';

const VerifyMFA = () => {
  const { t } = useAppTranslation();

  const { isProcessing, visitorID, handleOtpChange, userOTP, matchIsNumeric, trustDevice, handleVerifyOTP } =
    useVerifyMFA();

  return (
    <Container sx={{ marginTop: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '15px' }}>
        {t('mfaVerifyTitle')}
      </Typography>

      <Typography sx={{ marginBottom: '15px' }}>{t('mfaVerifyDesc')}</Typography>

      <Box sx={{ width: '100%', maxWidth: '450px', marginTop: '20px' }}>
        <MuiOtpInput
          value={userOTP}
          onChange={handleOtpChange}
          length={6}
          display="flex"
          gap={1}
          validateChar={matchIsNumeric}
          TextFieldsProps={{ autoComplete: 'off' }}
        />
      </Box>

      <Box sx={{ marginTop: '15px' }}>
        <FormControlLabel control={<Checkbox inputRef={trustDevice} />} label={t('trustDevice')} />
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          variant="contained"
          disabled={isProcessing || visitorID.toString().length === 0}
          onClick={handleVerifyOTP}
          endIcon={isProcessing ? <CircularProgress size={25} /> : null}
        >
          {t('mfaVerify')}
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyMFA;
