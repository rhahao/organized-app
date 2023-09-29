import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import RecoilOutside from 'recoil-outside';
import ServiceWorkerWrapper from '@sws2apps/react-sw-helper';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css';
import { initializeFirebaseApp } from '@services/firebase/index.js';
import i18n from '@services/i18n/index.js';

initializeFirebaseApp();
i18n.init();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilOutside />
      <ServiceWorkerWrapper publicServiceWorkerDest="/service-worker.js">
        <App />
      </ServiceWorkerWrapper>
    </RecoilRoot>
  </React.StrictMode>
);
