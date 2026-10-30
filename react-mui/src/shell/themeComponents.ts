import { alpha, type ThemeOptions } from '@mui/material/styles';

interface ComponentColours {
  dark: boolean;
  primary: string;
  subtle: string;
  secondaryText: string;
  divider: string;
}

export function themeComponents(
  colours: ComponentColours,
): ThemeOptions['components'] {
  const { dark, primary, subtle, secondaryText, divider } = colours;
  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          '--scrollbar-thumb': `color-mix(in srgb, ${primary} 55%, ${secondaryText})`,
          '--scrollbar-hover': primary,
        },
        body: { overflowX: 'hidden' },
        '::selection': { backgroundColor: alpha(primary, 0.28) },
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
      styleOverrides: { root: { borderRadius: 9, textTransform: 'none' } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '@media (prefers-reduced-motion: no-preference)': {
            '& .MuiSvgIcon-root': {
              animation: 'checkbox-off 180ms ease-out',
            },
            '&.Mui-checked .MuiSvgIcon-root, &.MuiCheckbox-indeterminate .MuiSvgIcon-root':
              {
                animation: 'checkbox-on 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              },
          },
          '@keyframes checkbox-on': {
            from: { transform: 'scale(0.65) rotate(-12deg)' },
            '65%': { transform: 'scale(1.12)' },
            to: { transform: 'none' },
          },
          '@keyframes checkbox-off': {
            from: { transform: 'scale(0.8)' },
            to: { transform: 'none' },
          },
        },
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
            '&:hover': {
              backgroundColor: alpha(primary, dark ? 0.14 : 0.1),
            },
          },
        },
      },
    },
    MuiTooltip: { defaultProps: { arrow: true, describeChild: true } },
  };
}
