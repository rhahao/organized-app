import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAppTranslation } from '@hooks/index';
import useFilter from './useFilter';

const PersonCustomFilter = () => {
  const { t } = useAppTranslation();

  const { filter, setFilter, backgroundColor, backgroundColorHover } = useFilter();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <TextField
        id="outlined-select-service"
        select
        size="small"
        sx={{
          borderRadius: '5px',
          width: '350px',
          backgroundColor,
          '&:hover': { backgroundColor: backgroundColorHover },
        }}
        defaultValue="allPersons"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <MenuItem value="allPersons">{t('allPersons')}</MenuItem>
        <Divider />
        <MenuItem value="allPublishers">{t('allPublishers')}</MenuItem>
        <MenuItem value="fieldServiceGroup">{t('fieldServiceGroup')}</MenuItem>
        <MenuItem value="unbaptizedPublishers">{t('unbaptizedPublishers')}</MenuItem>
        <MenuItem value="baptizedPublishers">{t('baptizedPublishers')}</MenuItem>
        <MenuItem value="auxiliaryPioneers">{t('auxiliaryPioneers')}</MenuItem>
        <MenuItem value="regularPioneers">{t('regularPioneers')}</MenuItem>
        <MenuItem value="appointedBrothers">{t('appointedBrothers')}</MenuItem>
        <Divider />
        <MenuItem value="inactivePublishers">{t('inactivePublishers')}</MenuItem>
      </TextField>
    </Box>
  );
};

export default PersonCustomFilter;
