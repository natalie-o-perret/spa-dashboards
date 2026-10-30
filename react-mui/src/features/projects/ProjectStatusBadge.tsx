import { alpha, Chip } from '@mui/material';
import type { ProjectStatus } from './projectSchema';
import type { StatusFilter } from './projectTableData';

const statusColours: Record<
  ProjectStatus,
  'success' | 'warning' | 'error' | 'primary'
> = {
  'On track': 'success',
  'At risk': 'warning',
  Blocked: 'error',
  Complete: 'primary',
};

export default function ProjectStatusBadge({
  status,
}: {
  status: StatusFilter;
}) {
  if (status === 'All statuses') return status;
  const colour = statusColours[status];
  return (
    <Chip
      label={status}
      color={colour}
      variant="filled"
      size="small"
      sx={(theme) => ({
        bgcolor: alpha(
          theme.palette[colour].main,
          theme.palette.mode === 'dark' ? 0.16 : 0.04,
        ),
        color: theme.palette[colour].main,
      })}
    />
  );
}
