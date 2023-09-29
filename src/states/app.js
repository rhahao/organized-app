import { atom, selector } from 'recoil';
import { generateMonths, getShortDateFormat, getShortDatePickerFormat } from '@services/i18n/translation';
import { convertStringToBoolean } from '@utils/common';

export const isLightThemeState = atom({
  key: 'isLightTheme',
  default: typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? false : true,
});

export const offlineOverrideState = atom({
  key: 'offlineOverride',
  default: false,
});

export const isAppLoadState = atom({
  key: 'isAppLoad',
  default: true,
});

export const isSetupState = atom({
  key: 'isSetup',
  default: true,
});

export const apiHostState = atom({
  key: 'apiHost',
  default: '',
});

export const isAboutOpenState = atom({
  key: 'isAboutOpen',
  default: false,
});

export const isLoginOpenState = atom({
  key: 'isLoginOpen',
  default: false,
});

export const appLangState = atom({
  key: 'appLang',
  default: (typeof window !== 'undefined' && localStorage.getItem('app_lang')) || 'e',
});

export const monthNamesState = selector({
  key: 'monthNames',
  get: ({ get }) => {
    const appLang = get(appLangState);

    const months = generateMonths(appLang);
    return months;
  },
});

export const shortDateFormatState = selector({
  key: 'shortDateFormat',
  get: ({ get }) => {
    const appLang = get(appLangState);

    const format = getShortDateFormat(appLang);
    return format;
  },
});

export const shortDatePickerFormatState = selector({
  key: 'shortDatePickerFormat',
  get: ({ get }) => {
    const appLang = get(appLangState);

    const format = getShortDatePickerFormat(appLang);
    return format;
  },
});

export const isDeleteDbOpenState = atom({
  key: 'isDeleteDbOpen',
  default: false,
});

export const isUserSignInState = atom({
  key: 'isUserSignIn',
  default: false,
});

export const isUserSignUpState = atom({
  key: 'isUserSignUp',
  default: false,
});

export const isEmailNotVerifiedState = atom({
  key: 'isEmailNotVerified',
  default: false,
});

export const isEmailBlockedState = atom({
  key: 'isEmailBlocked',
  default: false,
});

export const isCongAccountCreateState = atom({
  key: 'isCongAccountCreate',
  default: false,
});

export const isShowTermsUseState = atom({
  key: 'isShowLAG',
  default: typeof window !== 'undefined' && convertStringToBoolean(localStorage.getItem('termsUse')),
});

export const visitorIDState = atom({
  key: 'visitorID',
  default: '',
});

export const qrCodePathState = atom({
  key: 'qrCodePath',
  default: '',
});

export const secretTokenPathState = atom({
  key: 'secretTokenPath',
  default: '',
});

export const isOnlineState = atom({
  key: 'isOnline',
  default: navigator.onLine,
});

export const isUserMfaSetupState = atom({
  key: 'isUserMfaSetup',
  default: false,
});

export const isUserMfaVerifyState = atom({
  key: 'isUserMfaVerify',
  default: false,
});

export const isUnauthorizedRoleState = atom({
  key: 'isUnauthorizedRole',
  default: false,
});

export const isPrecachedState = atom({
  key: 'isPrecached',
  default: false,
});

export const showReloadState = atom({
  key: 'showReload',
  default: false,
});

export const isWhatsNewOpenState = atom({
  key: 'isWhatsNewOpen',
  default: false,
});

export const appNotificationsState = atom({
  key: 'appNotifications',
  default: [],
});
