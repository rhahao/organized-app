import { UpdateSpec } from 'dexie';
import { TimeAwayType } from '@definition/person';
import { SettingsType } from '@definition/settings';
import {
  setCongAccountConnected,
  setCongID,
  setEncryptedMasterKey,
  setIsMFAEnabled,
  setUserID,
} from '@services/recoil/app';
import { settingSchema } from './schema';
import { ValidateMeResponseType } from '@definition/api';
import appDb from '@db/appDb';
import worker from '@services/worker/backupWorker';

export const dbAppSettingsSave = async (setting: SettingsType) => {
  const current = await appDb.app_settings.get(1);

  const newSettings = { ...current, ...setting };
  await appDb.app_settings.put(newSettings);
};

export const dbAppSettingsUpdate = async (
  changes: UpdateSpec<SettingsType>
) => {
  await appDb.app_settings.update(1, changes);
};

export const dbAppSettingsTimeAwayAdd = async () => {
  const setting = await appDb.app_settings.get(1);

  setting.user_settings.user_time_away.push({
    id: crypto.randomUUID(),
    start_date: {
      value: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    end_date: { value: null, updatedAt: '' },
    comments: { value: '', updatedAt: '' },
    _deleted: { value: false, updatedAt: '' },
  });

  await appDb.app_settings.put(setting);
};

export const dbAppSettingsTimeAwayDelete = async (id) => {
  const setting = await appDb.app_settings.get(1);

  const currentTimeAway = setting.user_settings.user_time_away.find(
    (record) => record.id === id
  );
  currentTimeAway._deleted = {
    value: true,
    updatedAt: new Date().toISOString(),
  };

  await appDb.app_settings.put(setting);
};

export const dbAppSettingsTimeAwayUpdate = async (timeAway: TimeAwayType) => {
  const setting = await appDb.app_settings.get(1);

  const currentIndex = setting.user_settings.user_time_away.findIndex(
    (record) => record.id === timeAway.id
  );
  setting.user_settings.user_time_away[currentIndex] = { ...timeAway };

  await appDb.app_settings.put(setting);
};

export const dbAppSettingsSaveProfilePic = async (
  url: string,
  provider: string
) => {
  if (url && url !== '' && url !== null) {
    if (provider !== 'microsoft.com' && provider !== 'yahoo.com') {
      const downloadedImg = new Image();
      downloadedImg.crossOrigin = 'Anonymous';

      const imageReceived = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = downloadedImg.width;
        canvas.height = downloadedImg.height;
        canvas.innerText = downloadedImg.alt;

        context.drawImage(downloadedImg, 0, 0);

        canvas.toBlob((done) => savePic(done));

        // Remove the event listener to avoid memory leak
        downloadedImg.removeEventListener('load', imageReceived, false);
      };

      downloadedImg.src = url;
      downloadedImg.addEventListener('load', imageReceived, false);

      const savePic = (profileBlob) => {
        profileBlob.arrayBuffer().then((profileBuffer) => {
          dbAppSettingsUpdate({ 'user_settings.user_avatar': profileBuffer });
        });
      };

      return;
    }
  }

  await dbAppSettingsUpdate({ 'user_settings.user_avatar': undefined });
};

export const dbAppSettingsUpdateUserInfoAfterLogin = async (
  data: ValidateMeResponseType
) => {
  const settings = await appDb.app_settings.get(1);

  await dbAppSettingsUpdate({
    'cong_settings.country_code': data.result.country_code,
    'cong_settings.cong_name': data.result.cong_name,
    'cong_settings.cong_number': data.result.cong_number,
    'user_settings.cong_role': data.result.cong_role,
    'user_settings.account_type': 'vip',
    'cong_settings.cong_location': data.result.cong_location,
    'cong_settings.cong_circuit': data.result.cong_circuit,
  });

  if (
    settings.user_settings.firstname.updatedAt < data.result.firstname.updatedAt
  ) {
    await dbAppSettingsUpdate({
      'user_settings.firstname': data.result.firstname,
    });
  }

  if (
    settings.user_settings.lastname.updatedAt < data.result.lastname.updatedAt
  ) {
    await dbAppSettingsUpdate({
      'user_settings.lastname': data.result.lastname,
    });
  }

  const midweekMeeting = structuredClone(
    settings.cong_settings.midweek_meeting
  );
  for (const item of midweekMeeting) {
    const remoteItem = data.result.midweek_meeting.find(
      (record) => record.type === item.type
    );
    if (remoteItem) {
      item.time = remoteItem.time;
      item.weekday = remoteItem.weekday;
    }
  }
  await dbAppSettingsUpdate({
    'cong_settings.midweek_meeting': midweekMeeting,
  });

  const weekendMeeting = structuredClone(
    settings.cong_settings.weekend_meeting
  );
  for (const item of weekendMeeting) {
    const remoteItem = data.result.weekend_meeting.find(
      (record) => record.type === item.type
    );
    if (remoteItem) {
      item.time = remoteItem.time;
      item.weekday = remoteItem.weekday;
    }
  }
  await dbAppSettingsUpdate({
    'cong_settings.weekend_meeting': weekendMeeting,
  });

  await setIsMFAEnabled(data.result.mfaEnabled);
  await setCongID(data.result.cong_id);
  await setCongAccountConnected(true);
  await setUserID(data.result.id);
  await setEncryptedMasterKey(data.result.cong_master_key);

  worker.postMessage({ field: 'userRole', value: data.result.cong_role });
  worker.postMessage({ field: 'userID', value: data.result.id });
  worker.postMessage({ field: 'congID', value: data.result.cong_id });
  worker.postMessage({ field: 'accountType', value: 'vip' });
};

export const dbAppSettingsBuildTest = async () => {
  const baseSettings = structuredClone(settingSchema);
  baseSettings.user_settings.account_type = 'vip';
  baseSettings.user_settings.firstname = {
    value: 'Test',
    updatedAt: new Date().toISOString(),
  };
  baseSettings.user_settings.lastname = {
    value: 'User',
    updatedAt: new Date().toISOString(),
  };
  baseSettings.cong_settings.country_code = 'USA';
  baseSettings.cong_settings.cong_name = 'Congregation Test';
  baseSettings.cong_settings.cong_number = '123456';
  baseSettings.cong_settings.cong_circuit = [{ type: 'main', value: '01 - A' }];
  baseSettings.user_settings.cong_role = ['admin'];

  await appDb.app_settings.put(baseSettings, 1);
};
