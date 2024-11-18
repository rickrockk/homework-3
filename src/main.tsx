import React from 'react';
import { createRoot } from 'react-dom/client';
import 'shared/config/configureMobX/configureMobX';
import 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';
import App from 'app/App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
