import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppModalWrapper } from '@wrapper/index';
import { AppNavBar } from '@layouts';
import { EmailLinkAuthentication, Startup } from '@features/app_start';
import { About, AppUpdater, ImportEPUB, ImportJWOrg, WhatsNewContent } from '@features/index';
import useRootLayout from './useRootLayout';
import logger from '@services/logger';

const RootLayout = ({ updatePwa }) => {
  const {
    enabledInstall,
    installPwa,
    isLoading,
    isAppLoad,
    isEmailAuth,
    isOpenAbout,
    autoLoginStatus,
    isImportJWOrg,
    isImportEPUB,
  } = useRootLayout();

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
        <WhatsNewContent />
        {isOpenAbout && <About />}
        {isImportEPUB && <ImportEPUB />}
        {isImportJWOrg && <ImportJWOrg />}
        {isAppLoad && isEmailAuth && <EmailLinkAuthentication />}
        {isAppLoad && !isEmailAuth && <Startup />}

        {!isAppLoad && <Outlet />}
      </Box>
    </AppModalWrapper>
  );
};

RootLayout.propTypes = {
  updatePwa: PropTypes.func,
};

export default RootLayout;
