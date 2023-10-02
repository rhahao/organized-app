import Box from '@mui/material/Box';
import useAnnouncements from './useAnnouncements';
import AnnouncementItem from './components';

const Announcements = () => {
  const { localAnnouncements } = useAnnouncements();

  return (
    <Box>
      {localAnnouncements.length > 0 &&
        localAnnouncements.map((announcement) => (
          <AnnouncementItem key={announcement.announcement_id} announcement={announcement} />
        ))}
    </Box>
  );
};

export default Announcements;
