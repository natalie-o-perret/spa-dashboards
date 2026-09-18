import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material';
import App from './App';
import './index.css';
import { createMosaicTheme } from './theme';

const storageKey = 'mosaic-colour-mode';

function initialMode(): PaletteMode {
  try {
    const savedMode = localStorage.getItem(storageKey);
    if (savedMode === 'light' || savedMode === 'dark') return savedMode;
  } catch {
    // Storage can be disabled while the rest of the app remains usable.
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function Root() {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const theme = createMosaicTheme(mode);

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;

    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // Keep the selected theme for this session when storage is unavailable.
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App
        mode={mode}
        onToggleMode={() =>
          setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))
        }
      />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
