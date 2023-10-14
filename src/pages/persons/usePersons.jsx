import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { alpha, useMediaQuery, useTheme } from '@mui/material';
import { isPersonDeleteState, personsActiveState } from '@states/persons';
import { themeOptionsState } from '@states/app';
import { personEditorRoleState } from '@states/settings';
import { personsFilter } from '@services/cpe/persons';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const usePersons = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  let searchParams = localStorage.getItem('searchParams');
  searchParams = searchParams ? JSON.parse(searchParams) : {};
  const txtSearchInitial = searchParams.txtSearch || '';

  const isPersonDelete = useRecoilValue(isPersonDeleteState);
  const themeOptions = useRecoilValue(themeOptionsState);
  const activePersons = useRecoilValue(personsActiveState);
  const isPersonEditor = useRecoilValue(personEditorRoleState);

  const [anchorElMenuSmall, setAnchorElMenuSmall] = useState(null);
  const [txtSearch, setTxtSearch] = useState(txtSearchInitial);
  const [isSearch, setIsSearch] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [persons, setPersons] = useState([]);

  const openMenuSmall = Boolean(anchorElMenuSmall);

  const backgroundColor = alpha(theme.palette.common[themeOptions.searchBg], 0.5);
  const backgroundColorHover = alpha(theme.palette.common[themeOptions.searchBg], 0.3);

  const handleClickMenuSmall = (event) => {
    setAnchorElMenuSmall(event.currentTarget);
  };

  const handleCloseMenuSmall = () => {
    setAnchorElMenuSmall(null);
  };

  const handleAddStudent = () => {
    navigate('/persons/new');
  };

  const handleTabChange = async (event, newValue) => {
    if (newValue === 0) {
      setPersons([]);
    }

    setTabValue(newValue);

    if (newValue === 0) {
      setTimeout(async () => {
        await handleSearchPerson();
      }, 500);
    }
  };

  const handleSearchChange = (value) => {
    let searchParams = localStorage.getItem('searchParams');
    searchParams = searchParams ? JSON.parse(searchParams) : {};
    searchParams.txtSearch = value;
    setTxtSearch(value);

    localStorage.setItem('searchParams', JSON.stringify(searchParams));
  };

  const handleSearchPerson = useCallback(async () => {
    handleCloseMenuSmall();
    setIsSearch(true);
    setPersons([]);

    setTimeout(async () => {
      setTabValue(0);

      let searchParams = localStorage.getItem('searchParams');
      searchParams = searchParams ? JSON.parse(searchParams) : {};

      const txtSearch = searchParams.txtSearch || '';
      const isMale = searchParams.isMale === undefined ? false : searchParams.isMale;
      const isFemale = searchParams.isFemale === undefined ? false : searchParams.isFemale;
      const isUnassigned = searchParams.isUnassigned === undefined ? false : searchParams.isUnassigned;
      const assTypes = searchParams.assTypes || [];
      const filter = searchParams.filter === undefined ? 'allPersons' : searchParams.filter;

      const result = await personsFilter(activePersons, {
        txtSearch,
        isMale,
        isFemale,
        isUnassigned,
        assTypes,
        filter,
      });

      setPersons(result);

      setIsSearch(false);
    }, 1000);
  }, [activePersons]);

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') handleSearchPerson();
  };

  useEffect(() => {
    if (!mdUp) setAnchorElMenuSmall(null);
  }, [mdUp]);

  useEffect(() => {
    handleSearchPerson();
  }, [handleSearchPerson]);

  return {
    isPersonDelete,
    txtSearch,
    isSearch,
    tabValue,
    openMenuSmall,
    handleClickMenuSmall,
    handleAddStudent,
    handleTabChange,
    handleSearchChange,
    handleSearchEnter,
    a11yProps,
    mdUp,
    backgroundColor,
    backgroundColorHover,
    handleSearchPerson,
    isPersonEditor,
    anchorElMenuSmall,
    handleCloseMenuSmall,
    persons,
  };
};

export default usePersons;
