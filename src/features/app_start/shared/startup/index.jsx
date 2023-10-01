import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useStartup from './useStartup';
import { WaitingCircular } from '@components/index';
import { AccountChooser, PocketStartup, UnauthorizedRole, VipStartup } from '@features/app_start';

const Startup = () => {
  const { isSetup, isAuth, isAccountChoose, accountType, isUnauthorizedRole } = useStartup();

  if (isSetup) {
    return (
      <>
        {isAuth && <WaitingCircular />}
        {!isAuth && (
          <>
            {isAccountChoose && <AccountChooser />}
            {!isAccountChoose && (
              <>
                {accountType === 'vip' && <VipStartup />}
                {accountType === 'pocket' && <PocketStartup />}
                {isUnauthorizedRole && <UnauthorizedRole />}
              </>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <Box className="app-splash-screen">
      <Box className="app-logo-container">
        <img src="/img/appLogo.png" alt="App logo" className="appLogo" />
      </Box>
      <Box sx={{ width: '280px', marginTop: '10px' }}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default Startup;
