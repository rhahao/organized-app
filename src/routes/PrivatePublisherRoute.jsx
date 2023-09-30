import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivatePublisherRoute({ isPublisher }) {
  return isPublisher ? <Outlet /> : <Navigate to="/" />;
}

PrivatePublisherRoute.propTypes = {
  isPublisher: PropTypes.bool.isRequired,
};

export default PrivatePublisherRoute;
