import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import SearchIconWrapper from './components/SearchIconWrapper';
import StyledInputBase from './components/StyledInputBase';
import useSearch from './useSearch';
import { useAppTranslation } from '@hooks/index';

const SearchBar = ({ minWidth, txtSearch, onChange, onKeyUp, noSpace }) => {
  const { t } = useAppTranslation();

  const { backgroundColor, backgroundColorHover } = useSearch();

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '5px',
        backgroundColor,
        '&:hover': { backgroundColor: backgroundColorHover },
        marginBottom: noSpace ? null : '5px',
        marginRight: '5px',
        flexGrow: 1,
        minWidth: minWidth,
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t('search')}
        inputProps={{ 'aria-label': 'search' }}
        value={txtSearch}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={onKeyUp ? onKeyUp : null}
      />
    </Box>
  );
};

SearchBar.propTypes = {
  minWidth: PropTypes.string,
  txtSearch: PropTypes.string,
  onChange: PropTypes.func,
  noSpace: PropTypes.bool,
  onKeyUp: PropTypes.func,
};

export default SearchBar;
