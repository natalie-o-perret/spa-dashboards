import { getContrastRatio } from '@mui/material/styles';
import { describe, expect, it } from 'vitest';
import { createMeridianTheme } from './theme';

describe('dashboard colours', () => {
  it.each(['light', 'dark'] as const)(
    'keeps the %s palette readable',
    (mode) => {
      const { palette } = createMeridianTheme(mode);
      for (const background of [
        palette.background.default,
        palette.background.paper,
        palette.action.hover,
      ]) {
        for (const colour of [
          palette.primary.main,
          palette.text.primary,
          palette.text.secondary,
        ]) {
          expect(getContrastRatio(colour, background)).toBeGreaterThanOrEqual(
            4.5,
          );
        }
      }
      expect(
        getContrastRatio(palette.primary.main, palette.primary.contrastText),
      ).toBeGreaterThanOrEqual(4.5);
    },
  );
});
