import { useState } from 'react';
import {
  alpha,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  ClearRounded,
  DownloadRounded,
  SearchRounded,
} from '@mui/icons-material';
import {
  projects,
  type Project,
  type ProjectPriority,
  type ProjectStatus,
} from './projects';

type SortKey =
  'name' | 'owner' | 'status' | 'priority' | 'progress' | 'due' | 'budget';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'All statuses' | ProjectStatus;
type Density = 'comfortable' | 'compact';

const columns: ReadonlyArray<{
  key: SortKey;
  label: string;
  align?: 'left' | 'right';
}> = [
  { key: 'name', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'progress', label: 'Progress' },
  { key: 'due', label: 'Due date' },
  { key: 'budget', label: 'Budget', align: 'right' },
];

const statuses: readonly StatusFilter[] = [
  'All statuses',
  'On track',
  'At risk',
  'Blocked',
  'Complete',
];

const statusColours: Record<
  ProjectStatus,
  'success' | 'warning' | 'error' | 'primary'
> = {
  'On track': 'success',
  'At risk': 'warning',
  Blocked: 'error',
  Complete: 'primary',
};

const priorityColours: Record<
  ProjectPriority,
  'error' | 'warning' | 'info' | 'default'
> = {
  Critical: 'error',
  High: 'warning',
  Medium: 'info',
  Low: 'default',
};

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;
const budgetFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});
const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

function formatDate(value: string) {
  const [year, month, day] = value.split('-');
  return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`;
}

function formatBudget(value: number) {
  return budgetFormatter.format(value);
}

function quoteCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export default function ProjectsTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All statuses');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [density, setDensity] = useState<Density>('comfortable');

  const query = search.trim().toLocaleLowerCase('en');
  const filteredRows = projects.filter((project) => {
    if (status !== 'All statuses' && project.status !== status) return false;

    const displayedFields = [
      project.name,
      project.owner,
      project.status,
      project.priority,
      project.progress,
      `${project.progress}%`,
      project.due,
      formatDate(project.due),
      project.budget,
      formatBudget(project.budget),
    ];

    return displayedFields.some((value) =>
      String(value).toLocaleLowerCase('en').includes(query),
    );
  });

  const sortedRows = [...filteredRows];
  if (sortKey) {
    sortedRows.sort((leftProject, rightProject) => {
      const left = leftProject[sortKey];
      const right = rightProject[sortKey];
      const comparison =
        typeof left === 'number' && typeof right === 'number'
          ? left - right
          : collator.compare(String(left), String(right));

      return comparison
        ? comparison * (sortDirection === 'asc' ? 1 : -1)
        : leftProject.id - rightProject.id;
    });
  }

  const pageRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  const selectedOnPage = pageRows.filter((project) =>
    selected.has(project.id),
  ).length;
  const allOnPageSelected =
    pageRows.length > 0 && selectedOnPage === pageRows.length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const togglePage = () => {
    setSelected((current) => {
      const next = new Set(current);
      pageRows.forEach((project) => {
        if (allOnPageSelected) next.delete(project.id);
        else next.add(project.id);
      });
      return next;
    });
  };

  const toggleProject = (id: number) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('All statuses');
    setPage(0);
  };

  const exportCsv = () => {
    const csv = [
      [
        'ID',
        'Project',
        'Owner',
        'Status',
        'Priority',
        'Progress',
        'Due date',
        'Budget',
      ],
      ...sortedRows.map((project) => [
        project.id,
        project.name,
        project.owner,
        project.status,
        project.priority,
        `${project.progress}%`,
        project.due,
        project.budget,
      ]),
    ]
      .map((row) => row.map(quoteCsv).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meridian-projects.csv';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      component="section"
      id="projects"
      aria-labelledby="projects-title"
      sx={{ overflow: 'hidden' }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', sm: 'flex-start' },
          justifyContent: 'space-between',
          p: { xs: 2.5, sm: 3 },
        }}
      >
        <Box>
          <Typography id="projects-title" component="h2" variant="h2">
            Projects
          </Typography>
          <Typography sx={{ mt: 0.75, color: 'text.secondary' }}>
            18 projects across the current portfolio
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadRounded />}
          onClick={exportCsv}
          disabled={sortedRows.length === 0}
          sx={{ alignSelf: { sm: 'center' } }}
        >
          Export CSV
        </Button>
      </Stack>

      <Divider />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(240px, 1fr) minmax(180px, .5fr)',
            lg: 'minmax(230px, 1fr) 190px auto auto',
          },
          gap: 1.5,
          alignItems: 'center',
          p: { xs: 2, sm: 2.5 },
        }}
      >
        <TextField
          label="Search projects"
          size="small"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded aria-hidden="true" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small">
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={status}
            label="Status"
            onChange={(event) => {
              setStatus(event.target.value as StatusFilter);
              setPage(0);
            }}
          >
            {statuses.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={density}
          onChange={(_, value: Density | null) => value && setDensity(value)}
          aria-label="Table density"
          sx={{
            width: { xs: '100%', sm: 'fit-content' },
            '& .MuiToggleButton-root': { flex: { xs: 1, sm: 'initial' } },
          }}
        >
          <ToggleButton value="comfortable" aria-label="Comfortable density">
            Comfortable
          </ToggleButton>
          <ToggleButton value="compact" aria-label="Compact density">
            Compact
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="text"
          startIcon={<ClearRounded />}
          onClick={clearFilters}
          disabled={!search && status === 'All statuses'}
        >
          Clear filters
        </Button>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 2.5 },
          pb: 2,
        }}
      >
        <Typography
          aria-live="polite"
          sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
        >
          {sortedRows.length} {sortedRows.length === 1 ? 'project' : 'projects'}
          {' shown'}
        </Typography>
        <Typography
          aria-live="polite"
          sx={{ color: 'primary.main', fontSize: '0.875rem', fontWeight: 700 }}
        >
          {selected.size} selected
        </Typography>
      </Stack>

      <TableContainer
        role="region"
        tabIndex={0}
        aria-labelledby="projects-title"
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
          '&:focus-visible': {
            outline: '3px solid',
            outlineColor: 'primary.main',
            outlineOffset: '-3px',
          },
        }}
      >
        <Table
          aria-labelledby="projects-title"
          size={density === 'compact' ? 'small' : 'medium'}
          sx={{ minWidth: 1060 }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allOnPageSelected}
                  indeterminate={selectedOnPage > 0 && !allOnPageSelected}
                  onChange={togglePage}
                  slotProps={{
                    input: {
                      'aria-label': 'Select all projects on this page',
                    },
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  sortDirection={sortKey === column.key ? sortDirection : false}
                >
                  <TableSortLabel
                    active={sortKey === column.key}
                    direction={sortKey === column.key ? sortDirection : 'asc'}
                    onClick={() => handleSort(column.key)}
                    aria-label={`Sort by ${column.label}${
                      sortKey === column.key
                        ? `, currently ${sortDirection}ending`
                        : ''
                    }`}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box sx={{ py: 7, textAlign: 'center' }}>
                    <Typography component="p" variant="h3">
                      No projects found
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                      No projects match your current search and status filters.
                    </Typography>
                    <Button onClick={clearFilters} sx={{ mt: 1 }}>
                      Clear filters
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((project: Project) => (
                <TableRow
                  key={project.id}
                  hover
                  selected={selected.has(project.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.has(project.id)}
                      onChange={() => toggleProject(project.id)}
                      slotProps={{
                        input: {
                          'aria-label': `Select ${project.name}`,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {project.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {project.owner}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={project.status}
                      color={statusColours[project.status]}
                      variant="filled"
                      size="small"
                      sx={(theme) => {
                        const colour =
                          theme.palette[statusColours[project.status]].main;
                        return {
                          bgcolor: alpha(
                            colour,
                            theme.palette.mode === 'dark' ? 0.16 : 0.04,
                          ),
                          color: colour,
                        };
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={project.priority}
                      color={priorityColours[project.priority]}
                      variant="outlined"
                      size="small"
                      sx={
                        project.priority === 'Low'
                          ? { color: 'text.secondary', borderColor: 'divider' }
                          : undefined
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: 'center', minWidth: 140 }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        aria-label={`${project.name} progress ${project.progress} percent`}
                        sx={{ width: 82 }}
                      />
                      <Typography
                        component="span"
                        sx={{ minWidth: 38, fontSize: '0.8125rem' }}
                      >
                        {project.progress}%
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <time dateTime={project.due}>
                      {formatDate(project.due)}
                    </time>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {formatBudget(project.budget)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />
      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number.parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        showFirstButton
        showLastButton
        sx={{
          '& .MuiTablePagination-toolbar': {
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            py: { xs: 1, sm: 0 },
          },
          '& .MuiTablePagination-actions': {
            width: { xs: '100%', sm: 'auto' },
            justifyContent: 'flex-end',
          },
        }}
      />
    </Card>
  );
}
