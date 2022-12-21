import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import { GlobalContextProvider } from './contexts/GlobalContext';
import { TranslationContextProvider } from './contexts/TranslationContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <TranslationContextProvider>
        <AppRouter />
      </TranslationContextProvider>
    </GlobalContextProvider>
  </React.StrictMode>
);
