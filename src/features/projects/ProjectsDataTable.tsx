import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import ProjectRow from './ProjectRow';
import ProjectsTableHead from './ProjectsTableHead';
import type { ProjectsTableState } from './useProjectsTable';

export default function ProjectsDataTable({
  table,
}: {
  table: ProjectsTableState;
}) {
  return (
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
        size={table.density === 'compact' ? 'small' : 'medium'}
        sx={{ minWidth: 1060 }}
      >
        <ProjectsTableHead table={table} />
        <TableBody>
          {table.pageRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Box sx={{ py: 7, textAlign: 'center' }}>
                  <Typography component="p" variant="h3">
                    No projects found
                  </Typography>
                  <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                    No projects match your current search and status filters.
                  </Typography>
                  <Button onClick={table.clearFilters} sx={{ mt: 1 }}>
                    Clear filters
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            table.pageRows.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                selected={table.selected.has(project.id)}
                onToggle={() => table.toggleProject(project.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
