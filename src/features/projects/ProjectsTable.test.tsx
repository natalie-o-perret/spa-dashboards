import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { describe, expect, it, vi } from 'vitest';
import App from '../../App';
import { createMeridianTheme } from '../../shell/theme';

describe('projects table', () => {
  it('filters, cycles sorting, and paginates projects', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider theme={createMeridianTheme('light')}>
        <App mode="light" onToggleMode={vi.fn()} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Aurora mobile refresh')).toBeVisible();
    expect(screen.queryByText('Fieldnote analytics')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Go to next page' }));

    expect(screen.getByText('Fieldnote analytics')).toBeVisible();
    expect(screen.queryByText('Aurora mobile refresh')).not.toBeInTheDocument();

    await user.type(
      screen.getByRole('textbox', { name: 'Search projects' }),
      'At risk',
    );

    expect(screen.getByText('4 projects shown')).toBeVisible();
    expect(screen.getByText('0 selected')).toBeVisible();
    expect(screen.getByText('Beacon research hub')).toBeVisible();

    const projectSort = screen.getByRole('button', {
      name: /Sort by Project/,
    });
    await user.click(projectSort);
    await user.click(projectSort);

    let rows = within(
      screen.getByRole('table', { name: 'Projects' }),
    ).getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Quartz search relevance');

    await user.click(projectSort);

    expect(projectSort.closest('th')).not.toHaveAttribute('aria-sort');
    rows = within(screen.getByRole('table', { name: 'Projects' })).getAllByRole(
      'row',
    );
    expect(rows[1]).toHaveTextContent('Beacon research hub');
  });
});
