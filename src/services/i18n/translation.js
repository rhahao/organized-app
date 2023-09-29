import { getI18n } from 'react-i18next';

export const getTranslation = ({ key, language = 'e', namespace = 'ui' }) => {
  return getI18n().getDataByLanguage(language)[namespace][key];
};

export const generateMonths = (lang) => {
  const months = [];

  months.push(getTranslation({ key: 'january', language: lang }));
  months.push(getTranslation({ key: 'february', language: lang }));
  months.push(getTranslation({ key: 'march', language: lang }));
  months.push(getTranslation({ key: 'april', language: lang }));
  months.push(getTranslation({ key: 'may', language: lang }));
  months.push(getTranslation({ key: 'june', language: lang }));
  months.push(getTranslation({ key: 'july', language: lang }));
  months.push(getTranslation({ key: 'august', language: lang }));
  months.push(getTranslation({ key: 'september', language: lang }));
  months.push(getTranslation({ key: 'october', language: lang }));
  months.push(getTranslation({ key: 'november', language: lang }));
  months.push(getTranslation({ key: 'december', language: lang }));

  return months;
};

export const getShortDateFormat = (lang) => {
  return getTranslation({ key: 'shortDateFormat', language: lang });
};

export const getShortDatePickerFormat = (lang) => {
  return getTranslation({ key: 'shortDatePickerFormat', language: lang });
};
