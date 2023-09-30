import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppModalWrapper } from '@wrapper/index';
import { AppNavBar } from '@layouts';
import { AppUpdater } from '@features/index';
import useRootLayout from './useRootLayout';
import { Startup } from '@features/app_start';

const RootLayout = ({ updatePwa }) => {
  const { enabledInstall, installPwa, isLoading, isAppLoad, isEmailAuth } = useRootLayout();

  return (
    <AppModalWrapper>
      <AppNavBar enabledInstall={enabledInstall} isLoading={isLoading} installPwa={installPwa} />
      <AppUpdater updatePwa={updatePwa} enabledInstall={enabledInstall} />

      <Box sx={{ padding: '10px' }}>{isAppLoad && !isEmailAuth && <Startup />}</Box>
    </AppModalWrapper>
  );
};

RootLayout.propTypes = {
  updatePwa: PropTypes.func,
};

export default RootLayout;
