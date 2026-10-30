import {
  Chip,
  LinearProgress,
  Stack,
  TableCell,
  Typography,
} from '@mui/material';
import type { Project, ProjectPriority } from './projectSchema';
import ProjectStatusBadge from './ProjectStatusBadge';
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
  return (
    <>
      <TableCell>
        <ProjectStatusBadge status={project.status} />
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
