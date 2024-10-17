import { useEffect, useState, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiHostState } from './states/main';
import { appSnackOpenState } from './states/notification';
import { InternetChecker } from './features/internetChecker';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationWrapper from './features/notificationWrapper';
import WaitingPage from './components/WaitingPage';
import Migration from './migration';

const queryClient = new QueryClient();

// creating theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = ({ updatePwa }) => {
  const setApiHost = useSetRecoilState(apiHostState);

  const appSnackOpen = useRecoilValue(appSnackOpenState);

  const [isLoading, setIsLoading] = useState(true);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    let apiHost;

    if (import.meta.env.VITE_BACKEND_API) {
      apiHost = import.meta.env.VITE_BACKEND_API;
    } else {
      if (import.meta.env.DEV || window.location.host.indexOf('localhost') !== -1) {
        apiHost = 'http://localhost:8000/';
      } else {
        apiHost = 'https://api.sws2apps.com/';
      }
    }

    setApiHost(apiHost);

    console.info(`CPE: API: The client API is set to: ${apiHost}`);
  }, [setApiHost]);

  useEffect(() => {
    const checkBrowser = () => {
      if (!('Worker' in window)) {
        setIsSupported(false);
        console.error(`CPE: Browser Not Supported: Web Worker is not supported in this device`);
        return;
      }

      if (!('crypto' in window)) {
        setIsSupported(false);
        console.error(`CPE: Browser Not Supported: Web Crypto is not supported in this device`);
        return;
      }

      if (!crypto.randomUUID || typeof crypto.randomUUID !== 'function') {
        setIsSupported(false);
        console.error(`CPE: Browser Not Supported: Web Crypto RandomUUID is not supported in this device`);
        return;
      }

      if (!indexedDB) {
        setIsSupported(false);
        console.error(`CPE: Browser Not Supported: IndexedDb is not supported in this device`);
        return;
      }

      if (!('serviceWorker' in navigator)) {
        setIsSupported(false);
        console.error(`CPE: Browser Not Supported: Service Worker is not supported in this device`);
      }
    };

    checkBrowser();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <WaitingPage />;
  }

  return (
    <>
      {!isSupported && (
        <div className="browser-not-supported">
          You are using unsupported browser for the Congregation Program for Everyone app. Make sure that your browser
          is up to date, or try to use another browser.
        </div>
      )}
      {isSupported && (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <InternetChecker />
            {appSnackOpen && <NotificationWrapper />}
            <Suspense fallback={<WaitingPage />}>
              <Migration updatePwa={updatePwa} />
            </Suspense>
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </>
  );
};

export default App;
