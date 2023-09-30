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
