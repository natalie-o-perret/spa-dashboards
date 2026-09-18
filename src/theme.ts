import { alpha, createTheme, type PaletteMode } from '@mui/material/styles';

export function createMosaicTheme(mode: PaletteMode) {
  const dark = mode === 'dark';
  const ink = dark ? '#f7f1e7' : '#14213d';
  const paper = dark ? '#182230' : '#fffaf0';
  const cobalt = dark ? '#7892ff' : '#2453ff';
  const citrus = '#d9ef4a';

  return createTheme({
    palette: {
      mode,
      primary: { main: cobalt, contrastText: dark ? '#101b33' : '#fff' },
      secondary: { main: citrus, contrastText: '#101b33' },
      background: {
        default: dark ? '#0e1621' : '#f3efe5',
        paper,
      },
      text: {
        primary: ink,
        secondary: dark ? '#b7c0cf' : '#60697a',
      },
      divider: alpha(ink, dark ? 0.2 : 0.14),
      success: { main: dark ? '#77d7a1' : '#18784b' },
      warning: { main: dark ? '#ffc870' : '#a95012' },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif',
      h1: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(2.5rem, 6vw, 5.25rem)',
        fontWeight: 600,
        lineHeight: 0.96,
        letterSpacing: '-0.055em',
      },
      h2: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(1.7rem, 3vw, 2.55rem)',
        fontWeight: 600,
        lineHeight: 1.04,
        letterSpacing: '-0.035em',
      },
      h3: {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.15,
      },
      subtitle1: { fontWeight: 750, letterSpacing: '-0.015em' },
      button: { fontWeight: 800, letterSpacing: '0.01em' },
      overline: {
        fontSize: '0.7rem',
        fontWeight: 850,
        lineHeight: 1.4,
        letterSpacing: '0.15em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: {
            backgroundImage: dark
              ? 'radial-gradient(circle at 84% 8%, rgba(36,83,255,.13), transparent 26%), radial-gradient(circle at 18% 96%, rgba(217,239,74,.06), transparent 24%)'
              : 'radial-gradient(circle at 84% 8%, rgba(36,83,255,.09), transparent 24%), radial-gradient(circle at 12% 95%, rgba(217,239,74,.2), transparent 22%)',
            backgroundAttachment: 'fixed',
          },
          '::selection': {
            backgroundColor: citrus,
            color: '#101b33',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(ink, dark ? 0.18 : 0.13)}`,
            boxShadow: dark
              ? '0 16px 45px rgba(0,0,0,.18)'
              : '0 16px 45px rgba(34,39,54,.055)',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&:focus-visible': {
              outline: `3px solid ${cobalt}`,
              outlineOffset: 3,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: 'none' } },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 800 },
        },
      },
      MuiTooltip: {
        defaultProps: { arrow: true },
      },
    },
  });
}
