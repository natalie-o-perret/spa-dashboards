import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../../App';
import { createMeridianTheme } from '../../shell/theme';

describe('projects table', () => {
  afterEach(cleanup);

  it('uses status badges in filter choices and the selected value', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={createMeridianTheme('light')}>
        <App mode="light" onModeChange={vi.fn()} />
      </ThemeProvider>,
    );
    const select = screen.getByRole('combobox', { name: 'Status' });
    expect(select.querySelector('.MuiChip-root')).toBeNull();
    await user.click(select);
    const list = within(screen.getByRole('listbox'));
    expect(
      list
        .getByRole('option', { name: 'All statuses' })
        .querySelector('.MuiChip-root'),
    ).toBeNull();
    const blocked = list.getByRole('option', { name: 'Blocked' });
    expect(blocked.querySelector('.MuiChip-root')).not.toBeNull();
    await user.click(blocked);
    expect(
      within(select).getByText('Blocked').closest('.MuiChip-root'),
    ).not.toBeNull();
    expect(screen.getByText('2 projects shown')).toBeVisible();
  });

  it('filters, cycles sorting, and paginates projects', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider theme={createMeridianTheme('light')}>
        <App mode="light" onModeChange={vi.fn()} />
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
