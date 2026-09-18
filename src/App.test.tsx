import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { createMosaicTheme } from './theme';

describe('publication pipeline', () => {
  it('filters stories by status', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider theme={createMosaicTheme('light')}>
        <App mode="light" onToggleMode={vi.fn()} />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('heading', {
        name: 'The cities learning to breathe again',
      }),
    ).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Scheduled' }));

    expect(screen.getByText('2 of 6 pieces')).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: 'The quiet return of the night train',
      }),
    ).toBeVisible();
    expect(
      screen.queryByRole('heading', {
        name: 'The cities learning to breathe again',
      }),
    ).not.toBeInTheDocument();
  });
});
