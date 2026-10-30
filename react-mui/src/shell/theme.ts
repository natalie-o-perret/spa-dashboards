import { alpha, createTheme, type PaletteMode } from '@mui/material/styles';
import { themeComponents } from './themeComponents';

export function createMeridianTheme(mode: PaletteMode) {
  const dark = mode === 'dark';
  const primary = dark ? '#22d3ee' : '#006b85';
  const surface = dark ? '#18191c' : '#fbfeff';
  const subtle = dark ? '#202125' : '#eaf7fa';
  const secondaryText = dark ? '#b5b8c0' : '#526871';
  const divider = dark ? '#34363c' : '#cfe5eb';

  return createTheme({
    breakpoints: {
      values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
    },
    palette: {
      mode,
      primary: { main: primary, contrastText: dark ? '#101113' : '#ffffff' },
      background: { default: dark ? '#0d0e10' : '#f0fbfd', paper: surface },
      text: {
        primary: dark ? '#f3f4f6' : '#102f3a',
        secondary: secondaryText,
      },
      divider,
      success: { main: dark ? '#71d49a' : '#137344' },
      warning: { main: dark ? '#f4bd62' : '#8f4906' },
      error: { main: dark ? '#ffadb5' : '#ad2737' },
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
      h3: { fontSize: '1rem', fontWeight: 730, lineHeight: 1.35 },
      button: { fontWeight: 700 },
      overline: {
        fontSize: '0.7rem',
        fontWeight: 800,
        lineHeight: 1.4,
        letterSpacing: '0.12em',
      },
    },
    components: themeComponents({
      dark,
      primary,
      subtle,
      secondaryText,
      divider,
    }),
  });
}
