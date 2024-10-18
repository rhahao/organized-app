import { Box, Button, Stack, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import PasswordField from '../password_field';

const MasterKey = ({ next }) => {
  return (
    <Stack spacing="16px">
      <Typography sx={{ fontWeight: 'bold' }}>Create congregation master key</Typography>
      <Typography>
        This key securely encripts your congregation’s data, including reports and persons, and is essential for
        administrative tasks such as data export/import or making significant settings adjustments.
      </Typography>

      <Box
        sx={{
          backgroundColor: 'rgba(227, 58, 58, 0.12)',
          padding: '8px 16px',
          borderRadius: '12px',
          display: 'flex',
          gap: '8px',
        }}
      >
        <InfoOutlined sx={{ color: 'rgba(202, 38, 38, 1)', marginTop: '3px' }} />
        <Typography sx={{ color: 'rgba(202, 38, 38, 1)' }}>
          Please note and safeguard this key. Losing it could mean the loss of all your congregation's data.
        </Typography>
      </Box>

      <PasswordField label="Create master key" sx={{ marginTop: '24px !important' }} />
      <PasswordField label="Confirm master key" />

      <Button variant="contained" onClick={next}>
        Set master key
      </Button>
    </Stack>
  );
};

export default MasterKey;
