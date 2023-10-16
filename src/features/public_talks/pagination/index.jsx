import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';

const PublicTalkPagination = ({ count, page, handleChangePage, noLabel }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      labelDisplayedRows={({ from, to, count }) => (noLabel ? '' : `${from}–${to} / ${count}`)}
      rowsPerPageOptions={[]}
      rowsPerPage={10}
      onPageChange={handleChangePage}
      showFirstButton={true}
      showLastButton={true}
      sx={{ '.MuiTablePagination-displayedRows': { fontWeight: 'bold', fontSize: '16px' } }}
    />
  );
};

PublicTalkPagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  noLabel: PropTypes.number,
};

export default PublicTalkPagination;
