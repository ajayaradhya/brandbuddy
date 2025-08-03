import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './setupAxios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="2088540553-d4n5kbui8p5tkbef06q7kdpkl432gsr2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
