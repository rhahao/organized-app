export const convertStringToBoolean = (value) => {
  switch (value) {
    case 'true':
      true;
      break;
    case 'false':
      false;
      break;
    default:
      false;
      break;
  }
};

export const countUnreadNotifications = ({ announcements, language }) => {
  let count = 0;

  for (const announcement of announcements) {
    const findTitleIndex = announcement.title.findIndex((item) => item.language === language);
    let isRead = announcement.title[findTitleIndex].isRead;

    if (isRead) {
      const findBodyIndex = announcement.body.findIndex((item) => item.language === language);
      isRead = announcement.body[findBodyIndex].isRead;
    }

    if (!isRead) count++;
  }

  return count;
};
