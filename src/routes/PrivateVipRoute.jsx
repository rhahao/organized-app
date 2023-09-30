import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateVipRoute({ isLMMO, isSecretary, isCoordinator, isPublicTalkCoordinator }) {
  return isLMMO || isSecretary || isCoordinator || isPublicTalkCoordinator ? <Outlet /> : <Navigate to="/" />;
}

PrivateVipRoute.propTypes = {
  isLMMO: PropTypes.bool,
  isSecretary: PropTypes.bool,
  isCoordinator: PropTypes.bool,
  isPublicTalkCoordinator: PropTypes.bool,
};

export default PrivateVipRoute;
