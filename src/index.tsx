import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = container && createRoot(container);

root &&
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
