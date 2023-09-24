import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import UserS4Field from './UserS4Field';
import useUserRole from '../../hooks/useUserRole';

const UserS4 = ({ month }) => {
  const { t } = useTranslation('ui');

  const { secretaryRole } = useUserRole();

  return (
    <Paper elevation={1} sx={{ marginBottom: '20px', width: 'fit-content', padding: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography>Totals</Typography>
        {!secretaryRole && (
          <Tooltip title={t('S4SubmitTooltip')}>
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: '5px' }}>
        <UserS4Field fldType="S4PlacementsAlt" fldName="placements" month={month} />
        <UserS4Field fldType="S4VideoAlt" fldName="videos" month={month} />
        <UserS4Field fldType="S4HoursAlt" fldName="hours" month={month} />
        <UserS4Field fldType="S4ReturnVisitsAlt" fldName="returnVisits" month={month} />
        <UserS4Field fldType="S4BibleStudiesAlt" fldName="bibleStudies" month={month} />
      </Box>
    </Paper>
  );
};

export default UserS4;
