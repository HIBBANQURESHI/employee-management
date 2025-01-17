import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthContext from './context/authContext.jsx';

const loadGoogleFont = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap';
  document.head.appendChild(link);
};

loadGoogleFont();

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <div className="font-sans">
      <App />
    </div>
  </AuthContext>,
);
