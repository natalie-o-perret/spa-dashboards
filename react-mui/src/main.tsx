import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ThemeShell from './shell/ThemeShell';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeShell>{(props) => <App {...props} />}</ThemeShell>
  </StrictMode>,
);
