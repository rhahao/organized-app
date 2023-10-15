import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UserMFAOpt from '../mfa_opt';
import useMFASetup from './useMFASetup';
import { useAppTranslation } from '@hooks/index';

const UserMFA = () => {
  const { t } = useAppTranslation();

  const {
    handleClose,
    handleCopyClipboard,
    handleOptInMFA,
    openOptIn,
    qrCode,
    token,
    viewerOpen,
    setOpenOptIn,
    data,
    setViewerOpen,
    otpAuth,
  } = useMFASetup();

  return (
    <Box sx={{ marginTop: '10px', marginBottom: '20px' }}>
      {viewerOpen && (
        <Dialog
          open={viewerOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t('twoFactorTitle')}</DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: '14px' }}>
              <Markup content={t('twoFactorApp')} />
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
              {qrCode.length > 0 && <img className="qrcode" src={qrCode} alt="QR Code 2FA" />}
            </Box>
            <Typography sx={{ fontSize: '14px' }}>{t('twoFactorToken')}</Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                marginBottom: '10px',
              }}
            >
              <TextField
                id="outlined-token"
                variant="outlined"
                size="small"
                autoComplete="off"
                value={token}
                multiline
                sx={{ width: '380px', marginTop: '10px' }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton aria-label="copy" onClick={() => handleCopyClipboard(token)}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {openOptIn && (
        <UserMFAOpt
          open={openOptIn}
          setOpen={(value) => setOpenOptIn(value)}
          otpAuth={otpAuth}
          qrCodePath={qrCode}
          token={token}
        />
      )}

      <Typography>{t('twoFactorDesc')}</Typography>
      {data && !data.mfaEnabled && (
        <Button onClick={handleOptInMFA} variant="contained" sx={{ marginTop: '10px' }}>
          {t('enableLabel')}
        </Button>
      )}
      {data && data.mfaEnabled && (
        <Button onClick={() => setViewerOpen(true)} variant="contained" sx={{ marginTop: '10px' }}>
          {t('twoFactorAddDevice')}
        </Button>
      )}
    </Box>
  );
};

export default UserMFA;
