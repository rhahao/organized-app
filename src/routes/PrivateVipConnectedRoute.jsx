import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateVipConnectedRoute({ isCongAccountConnected, isAdmin }) {
  return isCongAccountConnected && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

PrivateVipConnectedRoute.propTypes = {
  isCongAccountConnected: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
};

export default PrivateVipConnectedRoute;
