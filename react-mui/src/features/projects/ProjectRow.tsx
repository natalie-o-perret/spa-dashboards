import {
  Checkbox,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Project } from './projectSchema';
import { formatBudget, formatDate } from './projectTableData';
import ProjectStatusCells from './ProjectStatusCells';

interface ProjectRowProps {
  project: Project;
  selected: boolean;
  onToggle: () => void;
}

export default function ProjectRow({
  project,
  selected,
  onToggle,
}: ProjectRowProps) {
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip title={`${selected ? 'Deselect' : 'Select'} ${project.name}`}>
          <Checkbox
            checked={selected}
            onChange={onToggle}
            slotProps={{ input: { 'aria-label': `Select ${project.name}` } }}
          />
        </Tooltip>
      </TableCell>
      <TableCell component="th" scope="row">
        <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
          {project.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{project.owner}</TableCell>
      <ProjectStatusCells project={project} />
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <time dateTime={project.due}>{formatDate(project.due)}</time>
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {formatBudget(project.budget)}
      </TableCell>
    </TableRow>
  );
}
