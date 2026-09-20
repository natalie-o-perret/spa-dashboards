import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ClearRounded, SearchRounded } from '@mui/icons-material';
import { statuses, type StatusFilter } from './projectTableData';
import DensityControl from './DensityControl';
import type { ProjectsTableState } from './useProjectsTable';

export default function ProjectsToolbar({
  table,
}: {
  table: ProjectsTableState;
}) {
  return (
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
        value={table.search}
        onChange={(event) => {
          table.setSearch(event.target.value);
          table.setPage(0);
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
          value={table.status}
          label="Status"
          onChange={(event) => {
            table.setStatus(event.target.value as StatusFilter);
            table.setPage(0);
          }}
        >
          {statuses.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DensityControl value={table.density} onChange={table.setDensity} />
      <Button
        variant="text"
        startIcon={<ClearRounded />}
        onClick={table.clearFilters}
        disabled={!table.search && table.status === 'All statuses'}
      >
        Clear filters
      </Button>
    </Box>
  );
}
