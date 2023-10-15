import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useUserFullname from './useUserFullname';
import { useAppTranslation } from '@hooks/index';

const UserFullname = () => {
  const { t } = useAppTranslation();

  const {
    accountType,
    handleCancelChanges,
    handleUpdateUsername,
    isEdit,
    setTempUsername,
    tmpUsername,
    userEmail,
    congAccountConnected,
  } = useUserFullname();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '5px',
        }}
      >
        <TextField
          id="settings-username"
          label={t('fullname')}
          variant="outlined"
          size="small"
          autoComplete="off"
          required={accountType === 'vip'}
          sx={{
            width: '320px',
            marginRight: '5px',
            marginBottom: '5px',
          }}
          InputProps={{ readOnly: !congAccountConnected || accountType === 'pocket' }}
          value={tmpUsername}
          onChange={(e) => setTempUsername(e.target.value)}
        />
        {isEdit && (
          <Box sx={{ marginBottom: '5px' }}>
            <IconButton aria-label="save" color="success" sx={{ marginRight: '5px' }} onClick={handleUpdateUsername}>
              <CheckCircleIcon />
            </IconButton>
            <IconButton aria-label="cancel" color="error" sx={{ marginRight: '5px' }} onClick={handleCancelChanges}>
              <CancelIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      {congAccountConnected && accountType === 'vip' && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            id="settings-email-address"
            label={t('email')}
            variant="outlined"
            size="small"
            autoComplete="off"
            sx={{
              width: '320px',
              marginRight: '5px',
              marginTop: '5px',
              marginBottom: '2px',
            }}
            value={userEmail}
            InputProps={{
              readOnly: true,
            }}
          />
          <Typography sx={{ fontSize: '12px' }}>{t('emailLocked')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserFullname;
