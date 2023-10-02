import { apiDefault } from './common';

export const apiFetchCountries = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, appLang } = await apiDefault();

  const res = await fetch(`${apiHost}api/congregations/countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      uid,
      visitorid,
      language: appLang.toUpperCase(),
    },
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const apiFetchCongregations = async (country, name) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, appLang } = await apiDefault();

  if (apiHost === '' || visitorid === '') {
    return { data: [] };
  }

  const res = await fetch(`${apiHost}api/congregations/list-by-country`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      uid,
      visitorid,
      language: appLang.toUpperCase(),
      country,
      name,
    },
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiCreateCongregation = async (country_code, cong_name, cong_number, role, fullname) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, appLang } = await apiDefault();

  const res = await fetch(`${apiHost}api/congregations`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      appclient: 'cpe',
      appversion,
      visitorid,
      uid,
      language: appLang.toUpperCase(),
    },
    body: JSON.stringify({ country_code, cong_name, cong_number, app_requestor: role, fullname }),
  });

  const data = await res.json();

  return { status: res.status, data };
};

export const apiApproveCongregationSpeakersRequest = async (cong_id) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, congID } = await apiDefault();

  try {
    const res = await fetch(`${apiHost}api/congregations/meeting/${congID}/request-speakers/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid, cong_id },
    });

    const data = await res.json();

    return { status: res.status, data };
  } catch (err) {
    throw new Error(err);
  }
};

export const apiDisapproveCongregationSpeakersRequest = async (cong_id) => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, congID } = await apiDefault();

  try {
    const res = await fetch(`${apiHost}api/congregations/meeting/${congID}/request-speakers/disapprove`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid, cong_id },
    });

    const data = await res.json();

    return { status: res.status, data };
  } catch (err) {
    throw new Error(err);
  }
};

export const apiGetCongregationSpeakersRequests = async () => {
  const { apiHost, appVersion: appversion, visitorID: visitorid, userUID: uid, congID } = await apiDefault();

  try {
    const res = await fetch(`${apiHost}api/congregations/meeting/${congID}/request-speakers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', appclient: 'cpe', appversion, visitorid, uid },
    });

    const data = await res.json();

    return { status: res.status, data };
  } catch (err) {
    throw new Error(err);
  }
};
