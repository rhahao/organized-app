import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppModalWrapper } from '@wrapper/index';
import { AppNavBar } from '@layouts';
import { About, AppUpdater } from '@features/index';
import useRootLayout from './useRootLayout';
import { EmailLinkAuthentication, Startup } from '@features/app_start';
import logger from '@services/logger';

const RootLayout = ({ updatePwa }) => {
  const { enabledInstall, installPwa, isLoading, isAppLoad, isEmailAuth, isOpenAbout, autoLoginStatus } =
    useRootLayout();

  useEffect(() => {
    if (autoLoginStatus !== '') {
      logger.info('app', autoLoginStatus);
    }
  }, [autoLoginStatus]);

  return (
    <AppModalWrapper>
      <AppNavBar enabledInstall={enabledInstall} isLoading={isLoading} installPwa={installPwa} />
      <AppUpdater updatePwa={updatePwa} enabledInstall={enabledInstall} />

      <Box sx={{ padding: '10px' }}>
        {isOpenAbout && <About />}
        {isAppLoad && isEmailAuth && <EmailLinkAuthentication />}
        {isAppLoad && !isEmailAuth && <Startup />}
      </Box>
    </AppModalWrapper>
  );
};

RootLayout.propTypes = {
  updatePwa: PropTypes.func,
};

export default RootLayout;
