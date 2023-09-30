import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateMeetingEditorRoute({ isMeetingEditor }) {
  return isMeetingEditor ? <Outlet /> : <Navigate to="/" />;
}

PrivateMeetingEditorRoute.propTypes = {
  isMeetingEditor: PropTypes.bool.isRequired,
};

export default PrivateMeetingEditorRoute;
