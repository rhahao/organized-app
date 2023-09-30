import OAuthButtonBase from '../button_base';
import microsoftIcon from '@assets/img/microsoft.svg';
import { useAppTranslation } from '@hooks';
import { authProvider } from '@services/firebase/auth';

const provider = authProvider.Microsoft;

const OAuthMicrosoft = () => {
  const { t } = useAppTranslation();

  return (
    <OAuthButtonBase
      provider={provider}
      text={t('oauthMicrosoft')}
      buttonStyles={{
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#2F2F2F',
          color: '#FFFFFF',
        },
      }}
      logo={microsoftIcon}
    />
  );
};

export default OAuthMicrosoft;
