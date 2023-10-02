import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
import useAnnouncementItem from './useAnnouncementItem';
import { useAppTranslation } from '@hooks/index';

const styles = {
  announcementAction: {
    borderRadius: '8px',
    '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
      borderRadius: 0,
      backgroundColor: 'rgba(23, 32, 42, .3)',
    },
  },
};

const AnnouncementItem = () => {
  const { t } = useAppTranslation();

  const {
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
  } = useAnnouncementItem();

  return (
    <Box
      sx={{
        padding: '5px',
        marginBottom: '10px',
        paddingBottom: '8px',
        borderBottom: '1px outset',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <NotificationsActiveIcon color={notificationIconColor} sx={{ fontSize: '30px', marginTop: '5px' }} />
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            {localeTitle.text}
          </Typography>
          <Box>
            <Markup content={bodyText} />
          </Box>

          <Box sx={{ marginTop: '15px', marginLeft: '10px', display: 'flex', gap: '15px' }}>
            {isUnreadNotification && (
              <IconButton color="inherit" edge="start" sx={styles.announcementAction} onClick={handleMarkAsRead}>
                <CheckCircleIcon color="success" />
                {largeView && <Typography sx={{ marginLeft: '5px' }}>{t('markAsRead')}</Typography>}
              </IconButton>
            )}

            {hasExpand && (
              <IconButton color="inherit" edge="start" sx={styles.announcementAction} onClick={handleToggleExpand}>
                {isExpanded && <CloseFullscreenIcon color="info" />}
                {!isExpanded && <ExpandCircleDownIcon color="info" />}

                {largeView && (
                  <Typography sx={{ marginLeft: '5px' }}>{isExpanded ? t('collapse') : t('expand')}</Typography>
                )}
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ fontSize: '13px', fontStyle: 'italic' }}>{publishedAt}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnnouncementItem;
