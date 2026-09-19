import {
  alpha,
  Chip,
  LinearProgress,
  Stack,
  TableCell,
  Typography,
} from '@mui/material';
import type { Project, ProjectPriority, ProjectStatus } from './projects';

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

export default function ProjectStatusCells({ project }: { project: Project }) {
  const statusColour = statusColours[project.status];
  return (
    <>
      <TableCell>
        <Chip
          label={project.status}
          color={statusColour}
          variant="filled"
          size="small"
          sx={(theme) => {
            const colour = theme.palette[statusColour].main;
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
    </>
  );
}
