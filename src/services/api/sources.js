import { apiDefault } from './common';

export const apiFetchSources = async () => {
  const { apiHost, appVersion: appversion, isOnline, sourceLang } = await apiDefault();

  if (isOnline && apiHost !== '') {
    const res = await fetch(`${apiHost}api/public/source-material/${sourceLang}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion },
    });

    const data = await res.json();

    return { status: res.status, data };
  }
};
