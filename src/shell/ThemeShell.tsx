import { useEffect, useState, type ReactNode } from 'react';
import { CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material';
import { createMeridianTheme } from './theme';

const storageKey = 'meridian-colour-mode';

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

interface ThemeShellProps {
  children: (props: {
    mode: PaletteMode;
    onToggleMode: () => void;
  }) => ReactNode;
}

export default function ThemeShell({ children }: ThemeShellProps) {
  const [mode, setMode] = useState<PaletteMode>(initialMode);
  const theme = createMeridianTheme(mode);

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
      {children({
        mode,
        onToggleMode: () =>
          setMode((current) => (current === 'light' ? 'dark' : 'light')),
      })}
    </ThemeProvider>
  );
}
