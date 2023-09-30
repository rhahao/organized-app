import { getI18n } from 'react-i18next';

export const getTranslation = ({ key, namespace = 'ui' }) => {
  const i18n = getI18n();

  if (i18n) {
    const language = i18n.language || 'e';

    return i18n.getDataByLanguage(language)[namespace][key];
  }
};

export const generateMonths = () => {
  const months = [];

  months.push(getTranslation({ key: 'january' }));
  months.push(getTranslation({ key: 'february' }));
  months.push(getTranslation({ key: 'march' }));
  months.push(getTranslation({ key: 'april' }));
  months.push(getTranslation({ key: 'may' }));
  months.push(getTranslation({ key: 'june' }));
  months.push(getTranslation({ key: 'july' }));
  months.push(getTranslation({ key: 'august' }));
  months.push(getTranslation({ key: 'september' }));
  months.push(getTranslation({ key: 'october' }));
  months.push(getTranslation({ key: 'november' }));
  months.push(getTranslation({ key: 'december' }));

  return months;
};

export const getShortDateFormat = () => {
  return getTranslation({ key: 'shortDateFormat' });
};

export const getShortDatePickerFormat = () => {
  return getTranslation({ key: 'shortDatePickerFormat' });
};

export const getMessageByCode = (code) => {
  switch (code) {
    case 'DEVICE_REMOVED':
      return getTranslation({ key: 'deviceRemoved' });
    case 'INPUT_INVALID':
      return getTranslation({ key: 'inputInvalid' });
    case 'POCKET_NOT_FOUND':
      return getTranslation({ key: 'pocketNotFound' });
    case 'INTERNAL_ERROR':
      return getTranslation({ key: 'internalError' });
    default:
      return code;
  }
};

export const handleAppChangeLanguage = (lang) => {
  const I18n = getI18n();

  I18n.changeLanguage(lang);
};
