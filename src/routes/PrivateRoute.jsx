import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ accountType }) {
  return accountType === 'vip' ? <Outlet /> : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  accountType: PropTypes.string,
};

export default PrivateRoute;
