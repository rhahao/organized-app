import OAuthButtonBase from '../button_base';
import yahooIcon from '@assets/img/yahoo.svg';
import { useAppTranslation } from '@hooks';
import { authProvider } from '@services/firebase/auth';

const provider = authProvider.Yahoo;

const OAuthYahoo = () => {
  const { t } = useAppTranslation();

  return (
    <OAuthButtonBase
      provider={provider}
      text={t('oauthYahoo')}
      buttonStyles={{
        backgroundColor: '#7E1FFF',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#7E1FFF',
          color: '#FFFFFF',
        },
      }}
      logo={yahooIcon}
    />
  );
};

export default OAuthYahoo;
