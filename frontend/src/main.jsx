import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './app/App.jsx';

import store from './store/store.js';

import setupInterceptors from './api/setupInterceptors.js';

import AuthBootstrap from './features/auth/AuthBootstrap.jsx';

import './index.css';

setupInterceptors(store);

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthBootstrap>
        <App />
      </AuthBootstrap>
    </Provider>
  </React.StrictMode>
);