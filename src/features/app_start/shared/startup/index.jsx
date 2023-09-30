import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useStartup from './useStartup';
import { WaitingCircular } from '@components/index';
import { AccountChooser, VipStartup } from '@features/app_start';

const Startup = () => {
  const { isSetup, isAuth, isAccountChoose, accountType } = useStartup();

  if (isSetup) {
    return (
      <>
        {isAuth && <WaitingCircular />}
        {!isAuth && (
          <>
            {isAccountChoose && <AccountChooser />}
            {!isAccountChoose && <>{accountType === 'vip' && <VipStartup />}</>}
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
