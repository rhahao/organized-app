import PropTypes from 'prop-types';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GetApp from '@mui/icons-material/GetApp';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import KeyIcon from '@mui/icons-material/Key';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ElevationScroll from './components/ElevationScroll';
import useNavBar from './useNavBar';
import useAppTranslation from '@hooks/useAppTranslation';
import { LanguageSwitcher, ThemeSwitcher } from '@features/index';

const sharedStyles = {
  menuIcon: {
    borderRadius: '8px',
    '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
      borderRadius: 0,
      backgroundColor: 'rgba(23, 32, 42, .3)',
    },
  },
};

const AppNavBar = (props) => {
  const { t } = useAppTranslation();

  const { enabledInstall, isLoading, installPwa } = props;

  const {
    themeOptions,
    handleGoDashboard,
    lgUp,
    mdUp,
    handleWhatsNewClick,
    cnNews,
    cnPendingReports,
    cnSpeakersRequests,
    cnSpeakersRequestsApproved,
    handleMenu,
    isAppLoad,
    username,
    userAvatar,
    congInfo,
    anchorEl,
    handleClose,
    accountType,
    isOnline,
    congAccountConnected,
    handleUseOnlineAccount,
    handleAbout,
    handleGoSettings,
    handleLogout,
    open,
  } = useNavBar();

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: themeOptions.mainColor,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: '50px !important',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Toolbar
            sx={{
              height: '50px !important',
              paddingLeft: '0px !important',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '40px',
              }}
            >
              <img
                src="./img/appLogo.png"
                alt="App Logo"
                onClick={handleGoDashboard}
                style={{
                  width: 'auto',
                  height: '50px',
                  borderRadius: '4px',
                  marginRight: '5px',
                  cursor: 'pointer',
                }}
              />
              <Typography noWrap sx={{ fontSize: '18px' }}>
                {lgUp ? t('appFullName') : t('appShortName')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <LanguageSwitcher />

              {!isLoading && enabledInstall && (
                <IconButton color="inherit" edge="start" sx={sharedStyles.menuIcon} onClick={installPwa}>
                  <GetApp />
                  {mdUp && <Typography sx={{ marginLeft: '5px' }}>{t('install')}</Typography>}
                </IconButton>
              )}

              <IconButton color="inherit" edge="start" sx={sharedStyles.menuIcon} onClick={handleWhatsNewClick}>
                <Badge
                  badgeContent={cnNews + cnPendingReports + cnSpeakersRequests + cnSpeakersRequestsApproved}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <ThemeSwitcher />

              <IconButton
                color="inherit"
                edge="start"
                sx={sharedStyles.menuIcon}
                onClick={handleMenu}
                id="button-account"
                aria-controls={open ? 'menu-account' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {mdUp && !isAppLoad && (
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        textAlign: 'right',
                        fontSize: '12px',
                      }}
                    >
                      {username}
                    </Typography>
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        textAlign: 'right',
                        fontSize: '12px',
                      }}
                    >
                      {congInfo}
                    </Typography>
                  </Box>
                )}
                {userAvatar && (
                  <Avatar alt="Avatar" src={userAvatar} sx={{ width: 32, height: 32, border: '1px solid white' }} />
                )}
                {!userAvatar && <AccountCircle sx={{ fontSize: '40px' }} />}
              </IconButton>
              <Menu
                sx={{ marginTop: '40px', '.MuiMenu-list': { minWidth: '200px !important' } }}
                id="menu-account"
                MenuListProps={{
                  'aria-labelledby': 'button-account',
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!isAppLoad && accountType === 'vip' && isOnline && !congAccountConnected && (
                  <MenuItem onClick={handleUseOnlineAccount}>
                    <ListItemIcon>
                      <KeyIcon fontSize="medium" sx={{ color: '#DC7633' }} />
                    </ListItemIcon>
                    <ListItemText>{t('useOnlineAccount')}</ListItemText>
                  </MenuItem>
                )}

                {!isAppLoad && (
                  <MenuItem onClick={handleGoSettings}>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon fontSize="medium" color="warning" />
                    </ListItemIcon>
                    <ListItemText>{t('myUserProfile')}</ListItemText>
                  </MenuItem>
                )}

                <Link
                  href={`https://sws2apps.com/${t('docsUrlCode')}/category/congregation-program-for-everyone`}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  color="inherit"
                >
                  <MenuItem>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon>
                        <HelpIcon fontSize="medium" color="primary" />
                      </ListItemIcon>
                      <ListItemText>{t('navMenuHelp')}</ListItemText>
                    </Box>
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleAbout}>
                  <ListItemIcon>
                    <InfoIcon fontSize="medium" sx={{ color: '#3498DB' }} />
                  </ListItemIcon>
                  <ListItemText>{t('about')}</ListItemText>
                </MenuItem>

                {!isAppLoad && accountType === 'vip' && isOnline && congAccountConnected && (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="medium" sx={{ color: '#E74C3C' }} />
                    </ListItemIcon>
                    <ListItemText>{t('logoutOnlineAccount')}</ListItemText>
                  </MenuItem>
                )}

                {!isAppLoad && !mdUp && (
                  <MenuItem disabled={true} sx={{ opacity: '1 !important' }}>
                    <Box
                      sx={{
                        borderTop: '1px outset',
                        paddingTop: '5px',
                        width: '100%',
                        minWidth: '200px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        sx={{
                          marginLeft: '5px',
                          textAlign: 'right',
                          fontSize: '12px',
                        }}
                      >
                        {username}
                      </Typography>
                      <Typography
                        sx={{
                          marginLeft: '5px',
                          textAlign: 'right',
                          fontSize: '12px',
                        }}
                      >
                        {congInfo}
                      </Typography>
                    </Box>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

AppNavBar.propTypes = {
  enabledInstall: PropTypes.bool,
  isLoading: PropTypes.bool,
  installPwa: PropTypes.func,
};

export default AppNavBar;
