import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import TranslateIcon from '@mui/icons-material/Translate';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@hooks/useAppTranslation';
import useLanguage from './useLanguage';

const LanguageSwitcher = () => {
  const { t } = useAppTranslation();

  const {
    largeView,
    handleClick,
    anchorEl,
    isMenuOpen,
    handleClose,
    listUILangs,
    handleLocalizeOpen,
    handleLangChange,
  } = useLanguage();

  return (
    <>
      <Tooltip title={largeView ? '' : t('changeLanguage')}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            borderRadius: '8px',
            '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
              borderRadius: 0,
              backgroundColor: 'rgba(23, 32, 42, .3)',
            },
          }}
          onClick={handleClick}
        >
          <TranslateIcon />
          {largeView && <Typography sx={{ marginLeft: '5px' }}>{t('changeLanguage')}</Typography>}
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-language"
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        sx={{ padding: 0, marginTop: '10px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {listUILangs.map((lang) => (
          <MenuItem key={lang.code} onClick={handleLangChange} sx={{ padding: 0 }}>
            <ListItemText data-code={lang.code}>
              <Typography sx={{ padding: '6px 16px' }}>{lang.name}</Typography>
            </ListItemText>
          </MenuItem>
        ))}
        <MenuItem sx={{ padding: 0, borderTop: '1px outset', marginTop: '10px' }} onClick={handleLocalizeOpen}>
          <Link href="https://github.com/sws2apps/cpe-sws/blob/main/TRANSLATION.md" target="_blank" rel="noopener">
            <Box sx={{ padding: '10px 16px', display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <LanguageIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontSize: '14px' }}>{t('languageMissing')}</Typography>
              </ListItemText>
            </Box>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
