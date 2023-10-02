import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useMediaQuery, useTheme } from '@mui/material';
import { appLangState } from '@states/app';
import { LANGUAGE_LIST } from '@constants/index';
import { markNotificationRead } from '@services/dexie/announcements';
import { formatDate } from '@services/dateformat';
import { useAppTranslation } from '@hooks/index';

const useAnnouncementItem = ({ announcement }) => {
  const { t } = useAppTranslation();

  const appLang = useRecoilValue(appLangState);

  const [sliceWord, setSliceWord] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [hasExpand, setHasExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bodyText, setBodyText] = useState('');

  const theme = useTheme();
  const largeView = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const fldKey = LANGUAGE_LIST.find((language) => language.code === appLang).locale;

  const localeTitle = announcement.title.find((item) => item.language === fldKey);
  const localeBody = announcement.body.find((item) => item.language === fldKey);

  const isUnreadNotification = (!localeTitle.isRead || !localeBody.isRead) && (!hasExpand || (hasExpand && isExpanded));
  const notificationIconColor = localeTitle.isRead && localeBody.isRead ? '' : 'error';

  const handleMarkAsRead = async () => {
    await markNotificationRead(announcement.announcement_id, fldKey);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => {
      if (prev) setBodyText(sliceWord);
      if (!prev) setBodyText(localeBody.text);
      return !prev;
    });
  };

  useEffect(() => {
    const titleModified = localeTitle.modifiedAt;
    const bodyModified = localeBody.modifiedAt;
    let publishedDate = titleModified;

    if (bodyModified > titleModified) publishedDate = bodyModified;

    let publishedLocale = '';
    if (publishedDate) {
      publishedLocale = formatDate(new Date(publishedDate), t('shortDateTimeFormat'));
    }

    setPublishedAt(publishedLocale);
  }, [localeTitle, localeBody, t]);

  useEffect(() => {
    setHasExpand(false);
    setIsExpanded(false);
    if (localeBody.text.length > 400) {
      const split = localeBody.text.slice(0, 120).split(' ');

      let finalWord = '';
      for (let i = 0; i < split.length - 1; i++) {
        finalWord = finalWord + split[i] + ' ';
      }

      finalWord = finalWord + ' ...';
      setSliceWord(finalWord);
      setBodyText(finalWord);
      setHasExpand(true);
    }

    if (localeBody.text.length <= 400) {
      setBodyText(localeBody.text);
    }
  }, [localeBody]);

  return {
    largeView,
    publishedAt,
    hasExpand,
    isExpanded,
    bodyText,
    handleMarkAsRead,
    handleToggleExpand,
    localeTitle,
    isUnreadNotification,
    notificationIconColor,
  };
};

export default useAnnouncementItem;
