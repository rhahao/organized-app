import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivatePublicTalkCoordinatorRoute({ isPublicTalkCoordinator }) {
  return isPublicTalkCoordinator ? <Outlet /> : <Navigate to="/" />;
}

PrivatePublicTalkCoordinatorRoute.propTypes = {
  isPublicTalkCoordinator: PropTypes.bool.isRequired,
};

export default PrivatePublicTalkCoordinatorRoute;
