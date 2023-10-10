import { useRecoilValue } from 'recoil';
import { alpha, useTheme } from '@mui/material';
import { themeOptionsState } from '@states/app';

const useSearch = () => {
  const theme = useTheme();

  const themeOptions = useRecoilValue(themeOptionsState);

  const backgroundColor = alpha(theme.palette.common[themeOptions.searchBg], 0.25);
  const backgroundColorHover = alpha(theme.palette.common[themeOptions.searchBg], 0.15);

  return { backgroundColor, backgroundColorHover };
};

export default useSearch;
