import { getI18n } from 'react-i18next';
import { Setting } from '../classes/Setting';

export const getLastDate = (month) => {
  return new Date(new Date(month).getFullYear(), new Date(month).getMonth() + 1, 0);
};

export const formatDateFull = (dateValue) => {
  const { t } = getI18n();
  const tmpDate = new Date(dateValue);

  const days = Setting.dayNames();
  const months = Setting.monthNames();

  const day = days[tmpDate.getDay()];
  const date = tmpDate.getDate();
  const month = months[tmpDate.getMonth()];
  const year = tmpDate.getFullYear();

  const template = t('dateFormatFull', { ns: 'ui', lng: Setting.appLang(), day, date, month, year });

  return template;
};
