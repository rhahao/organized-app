import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import RecoilOutside from 'recoil-outside';
import ServiceWorkerWrapper from '@sws2apps/react-sw-helper';
import { handleSWOnInstalled, handleSWOnUpdated } from '@services/recoil/app.js';
import logger from '@services/logger/index.js';
import App from './App.jsx';
import { initializeFirebaseApp } from '@services/firebase/index.js';
import { DatabaseWrapper } from '@wrapper';
import i18n from '@services/i18n/index.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css';
import './services/worker/backupWorker.js';

logger.info('app', `cpe version ${import.meta.env.PACKAGE_VERSION}`);

initializeFirebaseApp();
await i18n.init();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilOutside />
      <ServiceWorkerWrapper
        publicServiceWorkerDest="/service-worker.js"
        onError={(err) => logger.error('app', `An error occured: ${err}`)}
        onInstalled={handleSWOnInstalled}
        onUpdated={handleSWOnUpdated}
        onWaiting={handleSWOnUpdated}
      >
        {({ update }) => (
          <DatabaseWrapper>
            <App updatePwa={update} />
          </DatabaseWrapper>
        )}
      </ServiceWorkerWrapper>
    </RecoilRoot>
  </React.StrictMode>
);
