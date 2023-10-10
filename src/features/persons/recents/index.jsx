import Box from '@mui/material/Box';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import useRecents from './useRecents';
import PersonCard from '../card';
import { useAppTranslation } from '@hooks/index';

const PersonRecents = () => {
  const { t } = useAppTranslation();

  const { clearRecentsStudents, recentPersons } = useRecents();

  return (
    <Box sx={{ marginBottom: `${recentPersons.length > 0 ? '70px' : 0}` }}>
      {recentPersons.length > 0 && (
        <>
          <Grid container>
            {recentPersons.map((person) => (
              <PersonCard key={person.person_uid} person={person} />
            ))}
          </Grid>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab variant="extended" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={clearRecentsStudents}>
              <ClearAllIcon sx={{ mr: 1 }} />
              {t('clearRecents')}
            </Fab>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PersonRecents;
