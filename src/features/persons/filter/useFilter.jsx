import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { alpha, useTheme } from '@mui/material';
import { themeOptionsState } from '@states/app';

const useFilter = () => {
  const theme = useTheme();

  const themeOptions = useRecoilValue(themeOptionsState);

  let searchParams = localStorage.getItem('searchParams');
  searchParams = searchParams ? JSON.parse(searchParams) : {};
  const filterInitial = searchParams.filter === undefined ? 'allPersons' : searchParams.filter;

  const [filter, setFilter] = useState(filterInitial);

  const backgroundColor = alpha(theme.palette.common[themeOptions.searchBg], 0.25);
  const backgroundColorHover = alpha(theme.palette.common[themeOptions.searchBg], 0.15);

  useEffect(() => {
    let searchParams = localStorage.getItem('searchParams');
    searchParams = searchParams ? JSON.parse(searchParams) : {};
    searchParams.filter = filter;

    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  }, [filter]);

  return { filter, setFilter, backgroundColor, backgroundColorHover };
};

export default useFilter;
