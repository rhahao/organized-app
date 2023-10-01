import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  congAccountConnectedState,
  congSpeakersRequestsStateCountState,
  congSpeakersRequestsUpdateCountState,
  isAboutOpenState,
  isAppLoadState,
  isMyAssignmentOpenState,
  isOnlineState,
  isSetupState,
  isShowTermsUseState,
  isUserSignInState,
  isUserSignUpState,
  isWhatsNewOpenState,
  offlineOverrideState,
  pendingFieldServiceReportsCountState,
  themeOptionsState,
} from '@states/app';
import { countAnnouncementsState } from '@states/announcements';
import { apiUserLogout } from '@services/api/user';
import { accountTypeState, avatarUrlState, congNameState, congNumberState, usernameState } from '@states/settings';
import { formatCongregationInfo } from '@utils/common';

const useNavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const setWhatsNewOpen = useSetRecoilState(isWhatsNewOpenState);
  const setMyAssignmentOpen = useSetRecoilState(isMyAssignmentOpenState);
  const setIsAboutOpen = useSetRecoilState(isAboutOpenState);
  const setShowTermsUse = useSetRecoilState(isShowTermsUseState);
  const setIsUserSignIn = useSetRecoilState(isUserSignInState);
  const setIsUserSignUp = useSetRecoilState(isUserSignUpState);
  const setOfflineOverride = useSetRecoilState(offlineOverrideState);
  const setIsAppLoad = useSetRecoilState(isAppLoadState);
  const setIsSetup = useSetRecoilState(isSetupState);

  const themeOptions = useRecoilValue(themeOptionsState);
  const cnNews = useRecoilValue(countAnnouncementsState);
  const cnPendingReports = useRecoilValue(pendingFieldServiceReportsCountState);
  const cnSpeakersRequests = useRecoilValue(congSpeakersRequestsStateCountState);
  const cnSpeakersRequestsApproved = useRecoilValue(congSpeakersRequestsUpdateCountState);
  const isAppLoad = useRecoilValue(isAppLoadState);
  const username = useRecoilValue(usernameState);
  const userAvatar = useRecoilValue(avatarUrlState);
  const congName = useRecoilValue(congNameState);
  const congNumber = useRecoilValue(congNumberState);
  const accountType = useRecoilValue(accountTypeState);
  const isOnline = useRecoilValue(isOnlineState);
  const congAccountConnected = useRecoilValue(congAccountConnectedState);

  const congInfo = formatCongregationInfo(congName, congNumber);

  const [anchorEl, setAnchorEl] = useState(null);

  const mdUp = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  });

  const lgUp = useMediaQuery(theme.breakpoints.up('lg'), {
    noSsr: true,
  });

  const open = Boolean(anchorEl);

  const handleWhatsNewClick = () => {
    setMyAssignmentOpen(false);
    setWhatsNewOpen(true);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAbout = async () => {
    handleClose();
    setIsAboutOpen(true);
  };

  const handleUseOnlineAccount = () => {
    handleClose();
    setShowTermsUse(false);
    setIsUserSignUp(false);
    setIsUserSignIn(true);
    setOfflineOverride(true);
    setIsAppLoad(true);
    setIsSetup(true);
  };

  const handleLogout = async () => {
    handleClose();
    await apiUserLogout();
  };

  const handleGoDashboard = () => {
    navigate('/');
  };

  const handleGoSettings = () => {
    handleClose();
    navigate('/user-settings');
  };

  return {
    open,
    mdUp,
    lgUp,
    handleWhatsNewClick,
    handleMenu,
    handleClose,
    handleAbout,
    handleUseOnlineAccount,
    handleLogout,
    handleGoDashboard,
    handleGoSettings,
    themeOptions,
    cnNews,
    cnPendingReports,
    cnSpeakersRequests,
    cnSpeakersRequestsApproved,
    isAppLoad,
    username,
    userAvatar,
    congInfo,
    anchorEl,
    accountType,
    isOnline,
    congAccountConnected,
  };
};

export default useNavBar;
