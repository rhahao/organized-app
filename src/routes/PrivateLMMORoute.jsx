import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateLMMORoute({ isLMMO }) {
  return isLMMO ? <Outlet /> : <Navigate to="/" />;
}

PrivateLMMORoute.propTypes = {
  isLMMO: PropTypes.bool.isRequired,
};

export default PrivateLMMORoute;
