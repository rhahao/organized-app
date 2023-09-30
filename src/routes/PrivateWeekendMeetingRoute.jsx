import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateWeekendMeetingRoute({ isWeekendMeetingRole }) {
  return isWeekendMeetingRole ? <Outlet /> : <Navigate to="/" />;
}

PrivateWeekendMeetingRoute.propTypes = {
  isWeekendMeetingRole: PropTypes.bool.isRequired,
};

export default PrivateWeekendMeetingRoute;
