import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from '@mui/material';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeShell from './ThemeShell';
import TopBarActions from './TopBarActions';

function Palette() {
  return <output aria-label="Palette">{useTheme().palette.mode}</output>;
}

describe('theme preference', () => {
  let media: MediaQueryList;

  beforeEach(() => {
    localStorage.clear();
    media = Object.assign(new EventTarget(), {
      matches: false,
    }) as MediaQueryList;
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function renderTheme() {
    return render(
      <ThemeShell>
        {(props) => (
          <>
            <Palette />
            <TopBarActions {...props} />
          </>
        )}
      </ThemeShell>,
    );
  }

  function changeOS(dark: boolean) {
    act(() => {
      Object.assign(media, { matches: dark });
      media.dispatchEvent(new Event('change'));
    });
  }

  it.each([null, 'invalid', 'system'])(
    'defaults to System for %s and follows live OS changes',
    (saved) => {
      if (saved) localStorage.setItem('meridian-colour-mode', saved);
      renderTheme();
      expect(screen.getByLabelText('Palette')).toHaveTextContent('light');
      expect(localStorage.getItem('meridian-colour-mode')).toBe('system');
      changeOS(true);
      expect(screen.getByLabelText('Palette')).toHaveTextContent('dark');
      expect(document.documentElement.style.colorScheme).toBe('dark');
      expect(localStorage.getItem('meridian-colour-mode')).toBe('system');
      changeOS(false);
      expect(screen.getByLabelText('Palette')).toHaveTextContent('light');
    },
  );

  it('preserves saved choices and lets System follow the latest OS value', async () => {
    const user = userEvent.setup();
    localStorage.setItem('meridian-colour-mode', 'dark');
    const { unmount } = renderTheme();
    expect(screen.getByLabelText('Palette')).toHaveTextContent('dark');
    await user.click(
      screen.getByRole('button', {
        name: 'Theme: Dark. Switch to system theme',
      }),
    );
    expect(localStorage.getItem('meridian-colour-mode')).toBe('system');
    await user.click(
      screen.getByRole('button', {
        name: 'Theme: System. Switch to light theme',
      }),
    );
    changeOS(true);
    expect(screen.getByLabelText('Palette')).toHaveTextContent('light');
    expect(localStorage.getItem('meridian-colour-mode')).toBe('light');
    await user.click(
      screen.getByRole('button', {
        name: 'Theme: Light. Switch to dark theme',
      }),
    );
    expect(localStorage.getItem('meridian-colour-mode')).toBe('dark');
    await user.click(
      screen.getByRole('button', {
        name: 'Theme: Dark. Switch to system theme',
      }),
    );
    expect(screen.getByLabelText('Palette')).toHaveTextContent('dark');
    expect(localStorage.getItem('meridian-colour-mode')).toBe('system');
    unmount();
    renderTheme();
    expect(screen.getByLabelText('Palette')).toHaveTextContent('dark');
    expect(localStorage.getItem('meridian-colour-mode')).toBe('system');
  });

  it('works when storage is blocked and removes its OS listener on unmount', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });
    const removeListener = vi.spyOn(media, 'removeEventListener');
    const { unmount } = renderTheme();
    changeOS(true);
    expect(screen.getByLabelText('Palette')).toHaveTextContent('dark');
    await user.click(
      screen.getByRole('button', {
        name: 'Theme: System. Switch to light theme',
      }),
    );
    expect(screen.getByLabelText('Palette')).toHaveTextContent('light');
    unmount();
    expect(removeListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
