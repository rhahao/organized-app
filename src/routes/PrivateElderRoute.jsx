import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateElderRoute({ isElder }) {
  return isElder ? <Outlet /> : <Navigate to="/" />;
}

PrivateElderRoute.propTypes = {
  isElder: PropTypes.bool.isRequired,
};

export default PrivateElderRoute;
