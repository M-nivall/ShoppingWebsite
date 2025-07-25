import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store,persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { app } from './firebase-config';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} app={app}>
    <PersistGate loading = {"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);


