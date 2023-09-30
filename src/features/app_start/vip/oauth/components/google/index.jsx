import OAuthButtonBase from '../button_base';
import googleIcon from '@assets/img/google.svg';
import { authProvider } from '@services/firebase/auth';
import { useAppTranslation } from '@hooks';

const provider = authProvider.Google;

const OAuthGoogle = () => {
  const { t } = useAppTranslation();

  return (
    <OAuthButtonBase
      provider={provider}
      text={t('oauthGoogle')}
      buttonStyles={{
        backgroundColor: '#4285F4',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#4285F4',
          color: '#FFFFFF',
        },
      }}
      logo={googleIcon}
    />
  );
};

export default OAuthGoogle;
