import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CongregationUsersGroup from '../users_group';
import useUsers from './useUsers';

const CongregationUsers = () => {
  const { handleAddMember, isProcessing, members } = useUsers();

  return (
    <Box>
      <Box
        sx={{
          padding: '10px',
          marginTop: '20px',
          marginBottom: '60px',
        }}
      >
        {isProcessing && (
          <CircularProgress
            color="secondary"
            size={40}
            disableShrink={true}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
            }}
          />
        )}
        {!isProcessing &&
          members.length > 0 &&
          members.map((group) => <CongregationUsersGroup key={group.global_role} congregationGroup={group} />)}
      </Box>

      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 20, right: 20 }}>
        <Fab aria-label="save" color="primary" onClick={handleAddMember}>
          <PersonAddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default CongregationUsers;
