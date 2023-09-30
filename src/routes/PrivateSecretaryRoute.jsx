import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateSecretaryRoute({ isSecretary }) {
  return isSecretary ? <Outlet /> : <Navigate to="/" />;
}

PrivateSecretaryRoute.propTypes = {
  isSecretary: PropTypes.bool.isRequired,
};

export default PrivateSecretaryRoute;
