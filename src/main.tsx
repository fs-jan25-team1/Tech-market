import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import './index.css'; // for tailwind
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppRouter />
    </Router>
  </StrictMode>,
);
