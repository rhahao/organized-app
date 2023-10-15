import PropTypes from 'prop-types';
import { Markup } from 'interweave';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMFAOpt from './useMFAOpt';
import { useAppTranslation } from '@hooks/index';
import { TabPanel } from '@components/index';
import { matchIsNumeric } from '@utils/common';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const UserMFAOpt = ({ open, setOpen, qrCodePath, token, otpAuth }) => {
  const { t } = useAppTranslation();

  const {
    fullScreen,
    handleClose,
    handleCopyClipboard,
    handleOtpChange,
    handleTabChange,
    isNoQR,
    isProcessing,
    setIsNoQR,
    tabValue,
    userOTP,
    handleVerifyOTP,
    visitorID,
  } = useMFAOpt({ setOpen });

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="mfa-opt-in-dialog-title"
        aria-describedby="mfa-opt-in-dialog-description"
        fullScreen={fullScreen}
        scroll="paper"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>{t('setupMFA')}</span>
          <span>
            <IconButton color="error" aria-label="close" onClick={handleClose}>
              <CloseIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </span>
        </DialogTitle>
        <DialogContent>
          <Typography>
            <Markup content={t('mfaSetupTitle')} />
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label={t('thisDevice')} {...a11yProps(0)} />
              <Tab label={t('otherDevice')} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Typography sx={{ marginBottom: '15px' }}>{t('mfaThisDevice')}</Typography>
            <Button variant="contained" target="_blank" rel="noopener" href={otpAuth}>
              {t('setupThisDevice')}
            </Button>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {isNoQR && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                  marginTop: '10px',
                }}
              >
                <TextField
                  id="outlined-token"
                  label="Token"
                  variant="outlined"
                  autoComplete="off"
                  value={token}
                  multiline
                  sx={{ width: '100%', maxWidth: '500px' }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton aria-label="copy" onClick={() => handleCopyClipboard(token)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            )}

            {!isNoQR && (
              <Box>{qrCodePath.length > 0 && <img className="qrcode" src={qrCodePath} alt="QR Code 2FA" />}</Box>
            )}

            <Link
              component="button"
              underline="none"
              variant="body1"
              onClick={() => setIsNoQR(!isNoQR)}
              sx={{ marginTop: '15px' }}
            >
              {isNoQR ? t('scanQR') : t('copyToken')}
            </Link>
          </TabPanel>

          <Typography sx={{ marginBottom: '15px', marginTop: '20px' }}>{t('setupTextOTP')}</Typography>

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

          <Button
            variant="contained"
            sx={{ marginTop: '20px' }}
            disabled={isProcessing || visitorID.toString().length === 0}
            onClick={handleVerifyOTP}
            endIcon={isProcessing ? <CircularProgress size={25} /> : null}
          >
            {t('mfaVerify')}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

UserMFAOpt.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  qrCodePath: PropTypes.string,
  token: PropTypes.string,
  otpAuth: PropTypes.string,
};

export default UserMFAOpt;
