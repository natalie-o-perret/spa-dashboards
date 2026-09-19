import { alpha, createTheme, type PaletteMode } from '@mui/material/styles';

export function createMeridianTheme(mode: PaletteMode) {
  const dark = mode === 'dark';
  const primary = dark ? '#8bb4ff' : '#2563eb';
  const canvas = dark ? '#0f141d' : '#f5f7fa';
  const surface = dark ? '#171e2a' : '#ffffff';
  const subtle = dark ? '#1b2432' : '#f8f9fb';
  const text = dark ? '#f2f5fa' : '#172033';
  const secondaryText = dark ? '#aeb8c8' : '#637083';
  const divider = dark ? '#303845' : '#e5e8ed';

  return createTheme({
    breakpoints: {
      values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
    },
    palette: {
      mode,
      primary: {
        main: primary,
        contrastText: dark ? '#0b1220' : '#ffffff',
      },
      background: {
        default: canvas,
        paper: surface,
      },
      text: {
        primary: text,
        secondary: secondaryText,
      },
      divider,
      success: { main: dark ? '#71d49a' : '#17834f' },
      warning: { main: dark ? '#f4bd62' : '#a85a0a' },
      error: { main: dark ? '#ff8c8c' : '#c33b3b' },
      info: { main: dark ? '#9ecaff' : '#32658a' },
      action: {
        hover: subtle,
        selected: alpha(primary, dark ? 0.16 : 0.1),
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily:
        'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontSize: 'clamp(2.15rem, 4vw, 3.35rem)',
        fontWeight: 780,
        lineHeight: 1.05,
        letterSpacing: '-0.045em',
      },
      h2: {
        fontSize: '1.25rem',
        fontWeight: 760,
        lineHeight: 1.25,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1rem',
        fontWeight: 730,
        lineHeight: 1.35,
      },
      button: { fontWeight: 700 },
      overline: {
        fontSize: '0.7rem',
        fontWeight: 800,
        lineHeight: 1.4,
        letterSpacing: '0.12em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: { overflowX: 'hidden' },
          '::selection': {
            backgroundColor: alpha(primary, 0.28),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${divider}`,
            borderRadius: 16,
            boxShadow: dark
              ? '0 12px 32px rgba(0,0,0,.14)'
              : '0 10px 28px rgba(19,32,55,.045)',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&:focus-visible': {
              outline: `3px solid ${primary}`,
              outlineOffset: 2,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 9, textTransform: 'none' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 700 },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 7,
            borderRadius: 999,
            backgroundColor: alpha(primary, dark ? 0.17 : 0.1),
          },
          bar: { borderRadius: 999 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: subtle,
            color: secondaryText,
            fontSize: '0.75rem',
            fontWeight: 750,
          },
          root: { borderColor: divider },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: alpha(primary, dark ? 0.14 : 0.07),
            },
          },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
      },
    },
  });
}
