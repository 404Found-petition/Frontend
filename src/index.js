// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';  // ✅ Tailwind 전역 스타일

import { GoogleOAuthProvider } from '@react-oauth/google';  // ✅ 추가

const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ 클라이언트 ID 붙여넣기 (실제 복사한 값으로 교체하세요)
const clientId = "993737985073-qhthheoiruduqv4oaem4ao6evq4i4ovm.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
