import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';
import { IconClose } from '@components/icons';
import { AppModalWrapper } from '@wrapper/index';
import {
  About,
  AppFeedback,
  AppUpdater,
  Contact,
  DemoStartup,
  EPUBMaterialsImport,
  JWMaterialsImport,
  MyAssignments,
  Startup,
  Support,
  UnsupportedBrowser,
  WorkInProgressNotif,
} from '@features/index';
import { isDemo } from '@constants/index';
import useGlobal from '@hooks/useGlobal';
import useRootLayout from './useRootLayout';
import NavBar from '@layouts/navbar';
import WaitingCircular from '@components/waiting_circular';

const RootLayout = ({ updatePwa }: { updatePwa: VoidFunction }) => {
  const { isSupported } = useGlobal();

  const {
    isAppLoad,
    isOpenAbout,
    isOpenContact,
    isOpenSupport,
    isImportJWOrg,
    isImportEPUB,
  } = useRootLayout();

  return (
    <AppModalWrapper>
      <NavBar isSupported={isSupported} />
      <AppUpdater updatePwa={updatePwa} />

      <AppFeedback />

      <WorkInProgressNotif />
      {isImportJWOrg && <JWMaterialsImport />}
      {isImportEPUB && <EPUBMaterialsImport />}

      <Toolbar sx={{ padding: 0 }}>
        {/* temporary workaround while page components are being built */}
        <IconClose sx={{ opacity: 0 }} />
      </Toolbar>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1440px',
          width: '100%',
          paddingLeft: { mobile: '16px', tablet: '24px', desktop: '32px' },
          paddingRight: { mobile: '16px', tablet: '24px', desktop: '32px' },
          marginTop: '24px',
        }}
      >
        {!isSupported && <UnsupportedBrowser />}

        {isSupported && (
          <>
            {isOpenContact && <Contact />}
            {isOpenAbout && <About />}
            {isOpenSupport && <Support />}

            {isAppLoad && !isDemo && <Startup />}

            {isAppLoad && isDemo && <DemoStartup />}

            {!isAppLoad && (
              <Suspense fallback={<WaitingCircular />}>
                <Box sx={{ marginBottom: '32px' }}>
                  <MyAssignments />
                  <Outlet />
                </Box>
              </Suspense>
            )}
          </>
        )}
      </Container>
    </AppModalWrapper>
  );
};

export default RootLayout;
