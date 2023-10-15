import Box from '@mui/material/Box';
import { DataStorage, MyUserAccount } from '@features/index';

const sharedStyles = { settingItem: { margin: '10px 2px', padding: '5px' } };

const UserSettings = () => {
  return (
    <Box>
      <Box sx={sharedStyles.settingItem}>
        <MyUserAccount />
      </Box>

      <Box sx={sharedStyles.settingItem}>
        <DataStorage />
      </Box>
    </Box>
  );
};

export default UserSettings;
