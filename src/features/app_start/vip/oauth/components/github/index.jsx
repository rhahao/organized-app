import OAuthButtonBase from '../button_base';
import githubIcon from '@assets/img/github.svg';
import { useAppTranslation } from '@hooks';
import { authProvider } from '@services/firebase/auth';

const provider = authProvider.GitHub;

const OAuthGitHub = () => {
  const { t } = useAppTranslation();

  return (
    <OAuthButtonBase
      provider={provider}
      text={t('oauthGithub')}
      buttonStyles={{
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#2F2F2F',
          color: '#FFFFFF',
        },
      }}
      logo={githubIcon}
    />
  );
};

export default OAuthGitHub;
