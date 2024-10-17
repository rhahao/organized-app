import { Box, Button, Stack } from '@mui/material';

const ActionKeys = ({ previous, next }) => {
  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button variant="contained" onClick={next}>
          Continue
        </Button>
        <Button onClick={previous}>Back</Button>
      </Box>
    </Stack>
  );
};

export default ActionKeys;
