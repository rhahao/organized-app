import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LanguageIcon from '@mui/icons-material/Language';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useSourcesForms from './useSourcesForms';
import { useAppTranslation } from '@hooks/index';

const SourcesFormsSettings = () => {
  const { t } = useAppTranslation();

  const { handleSourceLangChange, isEditor, listSourceLangs, tempSourceLang } = useSourcesForms();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography className={'settingHeader'}>{t('sourcesFormsSettings')}</Typography>
      <Divider sx={{ borderWidth: '5px' }} />
      <Box sx={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Box>
          <Typography sx={{ marginBottom: '15px' }}>{t('sourceTemplateLangDesc')}</Typography>

          <TextField
            id="outlined-select-class"
            select
            label={t('changeLanguage')}
            value={tempSourceLang}
            defaultValue={'e'}
            onChange={handleSourceLangChange}
            InputProps={{ readOnly: !isEditor }}
            size="small"
            sx={{ minWidth: 100 }}
          >
            {listSourceLangs.map((lang) => (
              <MenuItem key={`source-language-${lang.code}`} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
            <MenuItem sx={{ padding: 0, borderTop: '1px outset', marginTop: '10px' }} value="not_set">
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
          </TextField>
        </Box>
      </Box>
      {!isEditor && (
        <Typography sx={{ fontStyle: 'italic' }} color="#FE4119">
          {t('settingLockedMeetingEditor')}
        </Typography>
      )}
    </Box>
  );
};

export default SourcesFormsSettings;
