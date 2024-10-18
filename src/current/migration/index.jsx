import { Box, Divider, Paper, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import usePwa2 from 'use-pwa2/dist/index.js';
import useMigration from './useMigration';
import AdminUser from './admin_user';
import AppSnackBar from './app_snackbar';
import AppUpdater from './app_updater';
import Header from './header';
import StandardUser from './standard_user';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Migration = ({ updatePwa }) => {
  const { enabledInstall } = usePwa2();

  const { appSnackOpen, isAdmin } = useMigration();

  return (
    <ThemeProvider theme={lightTheme}>
      <Header />
      <AppUpdater updatePwa={updatePwa} enabledInstall={enabledInstall} />

      <Toolbar />

      {appSnackOpen && <AppSnackBar />}

      <Paper
        elevation={4}
        sx={{
          width: '90%',
          margin: '24px auto',
          maxWidth: '700px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NotificationsActive color="warning" />
          <Typography sx={{ fontWeight: 'bold' }}>CPE has been upgraded to Organized</Typography>
        </Box>
        <Divider />

        {!isAdmin && <StandardUser />}

        {isAdmin && <AdminUser />}
      </Paper>
    </ThemeProvider>
  );
};

export default Migration;
