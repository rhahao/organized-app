import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useUser from './useUser';

const CongregationUser = ({ person }) => {
  const { handleOpenDetails } = useUser({ person });

  const { username, global_role } = person;

  return (
    <Paper elevation={4} sx={{ padding: '5px 10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <AccountCircleIcon color={global_role === 'vip' ? 'primary' : 'secondary'} sx={{ fontSize: '30px' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{username}</Typography>
          <IconButton color="success" onClick={handleOpenDetails}>
            <OpenInNewIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

CongregationUser.propTypes = {
  person: PropTypes.object,
};

export default CongregationUser;
