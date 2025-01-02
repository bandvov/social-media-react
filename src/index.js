import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { I18nextProvider } from 'react-i18next';
import { CssBaseline } from '@mui/material';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode> 
);
