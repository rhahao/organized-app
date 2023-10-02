import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { announcementsState } from '@states/announcements';
import { appLangState } from '@states/app';
import { LANGUAGE_LIST } from '@constants/index';

const useAnnouncements = () => {
  const announcements = useRecoilValue(announcementsState);
  const appLang = useRecoilValue(appLangState);

  const [localAnnouncements, setLocalAnnouncements] = useState([]);

  const fldKey = LANGUAGE_LIST.find((language) => language.code === appLang).locale;

  useEffect(() => {
    const newAnnouncements = announcements.map((announcement) => {
      const localeTitle = announcement.title.find((item) => item.language === fldKey);
      const localeBody = announcement.body.find((item) => item.language === fldKey);

      const titleModified = localeTitle.modifiedAt;
      const bodyModified = localeBody.modifiedAt;
      let publishedDate = titleModified;

      if (bodyModified > titleModified) publishedDate = bodyModified;

      return { ...announcement, publishedDate };
    });

    newAnnouncements.sort((a, b) => {
      return a.publishedDate < b.publishedDate ? 1 : -1;
    });

    setLocalAnnouncements(newAnnouncements);
  }, [announcements, fldKey]);

  return { localAnnouncements };
};

export default useAnnouncements;
