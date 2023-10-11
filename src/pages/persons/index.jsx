import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import usePersons from './usePersons';
import { TabPanel } from '@components/index';
import { PersonCard, PersonCustomFilter, PersonDelete, PersonRecents, PersonSearchBar } from '@features/index';
import { useAppTranslation } from '@hooks/index';

const Persons = () => {
  const { t } = useAppTranslation();

  const {
    isPersonDelete,
    txtSearch,
    tabValue,
    openMenuSmall,
    handleClickMenuSmall,
    handleAddStudent,
    handleTabChange,
    handleSearchChange,
    a11yProps,
    mdUp,
    backgroundColor,
    backgroundColorHover,
    isPersonEditor,
    anchorElMenuSmall,
    handleCloseMenuSmall,
    persons,
    handleSearchEnter,
    isSearch,
    handleSearchPerson,
  } = usePersons();

  return (
    <Box>
      {isPersonDelete && <PersonDelete />}

      <Typography sx={{ margin: '0px 0px 20px 0px', textTransform: 'uppercase', fontWeight: 'bold' }}>
        {t('persons')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <PersonSearchBar
          minWidth={'280px'}
          txtSearch={txtSearch}
          onChange={handleSearchChange}
          onKeyUp={handleSearchEnter}
        />

        {mdUp && (
          <Box>
            <IconButton
              sx={{
                backgroundColor,
                '&:hover': { backgroundColor: backgroundColorHover },
                marginTop: '-5px',
                marginRight: '5px',
              }}
              onClick={handleSearchPerson}
            >
              <PersonSearchIcon sx={{ fontSize: '25px' }} />
            </IconButton>

            {isPersonEditor && (
              <IconButton
                sx={{
                  backgroundColor,
                  '&:hover': { backgroundColor: backgroundColorHover },
                  marginTop: '-5px',
                }}
                onClick={handleAddStudent}
              >
                <AddCircleIcon sx={{ fontSize: '25px' }} />
              </IconButton>
            )}
          </Box>
        )}

        {!mdUp && (
          <>
            {!isPersonEditor && (
              <IconButton
                sx={{
                  backgroundColor,
                  '&:hover': { backgroundColor: backgroundColorHover },
                  marginTop: '-5px',
                  marginRight: '5px',
                }}
                onClick={handleSearchPerson}
              >
                <PersonSearchIcon sx={{ fontSize: '25px' }} />
              </IconButton>
            )}

            {isPersonEditor && (
              <IconButton
                sx={{
                  backgroundColor: '#ABB2B9',
                  margin: '-5px 5px 0 5px',
                }}
                aria-label="more"
                id="persons-small-button"
                aria-controls={openMenuSmall ? 'persons-small-menu' : undefined}
                aria-expanded={openMenuSmall ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickMenuSmall}
              >
                <MoreVertIcon />
              </IconButton>
            )}

            {isPersonEditor && (
              <Menu
                id="persons-small-menu"
                anchorEl={anchorElMenuSmall}
                open={!mdUp && openMenuSmall}
                onClose={handleCloseMenuSmall}
                MenuListProps={{
                  'aria-labelledby': 'persons-small-button',
                }}
              >
                <MenuItem onClick={handleSearchPerson}>
                  <ListItemIcon>
                    <PersonSearchIcon sx={{ fontSize: '25px' }} />
                  </ListItemIcon>
                  <ListItemText>{t('search')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleAddStudent}>
                  <ListItemIcon>
                    <AddCircleIcon sx={{ fontSize: '25px' }} />
                  </ListItemIcon>
                  <ListItemText>{t('addNew')}</ListItemText>
                </MenuItem>
              </Menu>
            )}
          </>
        )}
      </Box>

      <PersonCustomFilter />

      <Box sx={{ marginBottom: '10px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label={`${t('searchResult')} (${persons.length})`} {...a11yProps(0)} />
            <Tab label={t('recentPersons')} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {!isSearch && (
            <>
              {persons.length > 0 && (
                <Grid container>
                  {persons.map((person) => (
                    <PersonCard key={person.person_uid} person={person} />
                  ))}
                </Grid>
              )}
            </>
          )}
          {isSearch && (
            <CircularProgress
              color="secondary"
              size={80}
              disableShrink={true}
              sx={{
                display: 'flex',
                margin: '20vh auto',
              }}
            />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <PersonRecents />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Persons;
