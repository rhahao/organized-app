import PropTypes from 'prop-types';
import { AppModalWrapper } from '@wrapper/index';
import { AppNavBar } from '@layouts';

const RootLayout = () => {
  return (
    <AppModalWrapper>
      <AppNavBar />
    </AppModalWrapper>
  );
};

RootLayout.propTypes = {
  updatePwa: PropTypes.func,
};

export default RootLayout;
