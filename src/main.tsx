import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from '@/contexts/UserContext';
import App from '@/App.tsx';
import '@/assets/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
