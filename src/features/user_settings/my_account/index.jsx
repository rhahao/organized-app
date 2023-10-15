import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import UserFullname from './components/user_fullname';
import UserMFA from './components/mfa_setup';
import UserPocketDevices from './components/pocket_sessions';
import UserVIPSessions from './components/vip_sessions';
import useUserSettings from './useUserSettings';
import { useAppTranslation } from '@hooks/index';

const subtitles = { fontWeight: 'bold', lineHeight: 1.2, paddingBottom: '5px' };

const MyUserAccount = () => {
  const { t } = useAppTranslation();

  const { accountType, congAccountConnected } = useUserSettings();

  return (
    <Box>
      <Typography className={'settingHeader'}>{t('myAccount')}</Typography>
      <Divider sx={{ borderWidth: '5px' }} />
      <Box sx={{ marginTop: '20px' }}>
        <UserFullname />
      </Box>

      {congAccountConnected && accountType === 'vip' && (
        <>
          <Typography sx={subtitles}>{t('twoFactor')}</Typography>
          <Divider />
          <UserMFA />
        </>
      )}

      {congAccountConnected && accountType === 'vip' && (
        <>
          <Typography sx={subtitles}>{t('sessions')}</Typography>
          <Divider />

          {accountType === 'vip' && <UserVIPSessions />}
          {accountType === 'pocket' && <UserPocketDevices />}
        </>
      )}
    </Box>
  );
};

export default MyUserAccount;
