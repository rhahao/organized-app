import { Box, Button, Stack } from '@mui/material';

const ActionLogin = ({ next }) => {
  return (
    <Stack>
      <Box>
        <Button variant="contained" onClick={next}>
          Continue
        </Button>
      </Box>
    </Stack>
  );
};

export default ActionLogin;
