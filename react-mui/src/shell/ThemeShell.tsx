import { useEffect, useState, type ReactNode } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  type PaletteMode,
} from '@mui/material';
import { createMeridianTheme } from './theme';

const storageKey = 'meridian-colour-mode';

export type ThemeMode = PaletteMode | 'system';

function initialMode(): ThemeMode {
  try {
    const savedMode = localStorage.getItem(storageKey);
    if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')
      return savedMode;
  } catch {
    // Storage can be disabled while the rest of the app remains usable.
  }

  return 'system';
}

interface ThemeShellProps {
  children: (props: {
    mode: ThemeMode;
    onModeChange: (mode: ThemeMode) => void;
  }) => ReactNode;
}

export default function ThemeShell({ children }: ThemeShellProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const resolvedMode =
    mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;
  const theme = createMeridianTheme(resolvedMode);

  useEffect(() => {
    document.documentElement.style.colorScheme = resolvedMode;
  }, [resolvedMode]);

  useEffect(() => {
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
        onModeChange: setMode,
      })}
    </ThemeProvider>
  );
}
