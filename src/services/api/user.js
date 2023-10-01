import { apiDefault } from './common';

export const apiUserLogout = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid } = await apiDefault();

  await fetch(`${apiHost}api/users/logout`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid: uid },
  });
};

export const apiPocketSignup = async (code) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid } = await apiDefault();

  const res = await fetch(`${apiHost}api/sws-pocket/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion },
    body: JSON.stringify({ visitorid, otp_code: code.toUpperCase() }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiRequestPasswordlesssLink = async (email, uid) => {
  const { apiHost, appVersion: appversion, appLang } = await apiDefault();

  const res = await fetch(`${apiHost}user-passwordless-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      applanguage: appLang,
    },
    body: JSON.stringify({ email, uid }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiUpdatePasswordlessInfo = async (uid) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid } = await apiDefault();

  const tmpEmail = localStorage.getItem('emailForSignIn');

  const res = await fetch(`${apiHost}user-passwordless-verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      uid,
    },
    body: JSON.stringify({ email: tmpEmail, visitorid }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiSendAuthorization = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid } = await apiDefault();

  const res = await fetch(`${apiHost}user-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      uid,
    },
    body: JSON.stringify({ visitorid }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiHandleVerifyOTP = async (userOTP, trustedDevice) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid } = await apiDefault();

  const res = await fetch(`${apiHost}api/mfa/verify-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid },
    body: JSON.stringify({ token: userOTP, trusted: trustedDevice }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiValidateMe = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid } = await apiDefault();

  const res = await fetch(`${apiHost}api/users/validate-me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid },
  });

  const data = await res.json();

  return { status: res.status, data };
};
