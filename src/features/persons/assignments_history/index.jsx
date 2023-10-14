import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppTranslation } from '@hooks/index';

const PersonAssignmentsHistory = ({ history }) => {
  const { t } = useAppTranslation();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <TableContainer
        sx={{
          maxHeight: '170px',
          marginBottom: '5px',
          maxWidth: '430px',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '60px' }} align="center">
                {t('date')}
              </TableCell>
              <TableCell
                style={{ width: '300px', minWidth: '300px' }}
                sx={{
                  '& .MuiTableCell-sizeSmall': { padding: '6px 3px 6px 3px' },
                }}
              >
                {t('assignment')}
              </TableCell>
              <TableCell style={{ width: '60px' }} align="center">
                {t('class')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history?.length > 0 &&
              history.map((item) => (
                <TableRow key={`${item.ID}-${item.assignmentID}`} hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    align="center"
                    style={{ width: '60px' }}
                    sx={{
                      '& .MuiTableCell-sizeSmall': {
                        padding: '6px 3px 6px 3px',
                      },
                    }}
                  >
                    {item.weekOfFormatted}
                  </TableCell>
                  <TableCell
                    sx={{
                      '& .MuiTableCell-sizeSmall': {
                        padding: '6px 3px 6px 3px',
                      },
                    }}
                  >
                    {item.assignmentName}
                  </TableCell>
                  <TableCell
                    style={{ width: '60px' }}
                    sx={{
                      '& .MuiTableCell-sizeSmall': {
                        padding: '6px 3px 6px 3px',
                      },
                    }}
                    align="center"
                  >
                    {item.class}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

PersonAssignmentsHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
};

export default PersonAssignmentsHistory;
