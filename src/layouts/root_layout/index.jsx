import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppModalWrapper } from '@wrapper/index';
import { AppNavBar } from '@layouts';
import { EmailLinkAuthentication, Startup } from '@features/app_start';
import {
  About,
  AppUpdater,
  BackupDbDialog,
  ImportEPUB,
  ImportJWOrg,
  RestoreDbDialog,
  WhatsNewContent,
} from '@features/index';
import { UserConfirmation } from '@components/index';
import useRootLayout from './useRootLayout';

const RootLayout = ({ updatePwa }) => {
  const {
    enabledInstall,
    installPwa,
    isLoading,
    isAppLoad,
    isEmailAuth,
    isOpenAbout,
    isImportJWOrg,
    isImportEPUB,
    isUserConfirm,
    isBackupDb,
    isRestoreDb,
  } = useRootLayout();

  return (
    <AppModalWrapper>
      <AppNavBar enabledInstall={enabledInstall} isLoading={isLoading} installPwa={installPwa} />
      <AppUpdater updatePwa={updatePwa} enabledInstall={enabledInstall} />

      <Box sx={{ padding: '10px' }}>
        <WhatsNewContent />

        {isOpenAbout && <About />}
        {isImportEPUB && <ImportEPUB />}
        {isImportJWOrg && <ImportJWOrg />}
        {isUserConfirm && <UserConfirmation />}
        {isBackupDb && <BackupDbDialog />}
        {isRestoreDb && <RestoreDbDialog />}

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
