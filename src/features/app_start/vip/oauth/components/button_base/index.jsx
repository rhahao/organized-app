import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useButtonBase from './useButtonBase';

const OAuthButtonBase = ({ buttonStyles, logo, text, provider }) => {
  const { handleAction, isAuthProcessing, visitorID } = useButtonBase({ provider });

  return (
    <Button
      variant="contained"
      sx={{ ...buttonStyles, height: '41px', padding: 0, width: '320px', justifyContent: 'flex-start' }}
      onClick={handleAction}
      disabled={visitorID.toString().length === 0 || isAuthProcessing}
    >
      <Box sx={{ width: '50px', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '10px',
            marginLeft: '1px',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img alt={`${text} Icon`} src={logo} style={{ width: '18px', height: '18px' }} />
        </Box>
      </Box>
      <Typography sx={{ textTransform: 'none' }}>{text}</Typography>
    </Button>
  );
};

OAuthButtonBase.propTypes = {
  buttonStyles: PropTypes.object,
  logo: PropTypes.string,
  text: PropTypes.string,
  provider: PropTypes.object,
};

export default OAuthButtonBase;
