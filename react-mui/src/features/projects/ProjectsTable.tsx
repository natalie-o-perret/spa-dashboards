import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';
import ProjectsDataTable from './ProjectsDataTable';
import ProjectsPagination from './ProjectsPagination';
import ProjectsToolbar from './ProjectsToolbar';
import { useProjectsTable } from './useProjectsTable';

export default function ProjectsTable() {
  const table = useProjectsTable();
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
          onClick={table.exportCsv}
          disabled={table.rows.length === 0}
          sx={{ alignSelf: { sm: 'center' } }}
        >
          Export CSV
        </Button>
      </Stack>
      <Divider />
      <ProjectsToolbar table={table} />
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
          {table.rows.length} {table.rows.length === 1 ? 'project' : 'projects'}
          {' shown'}
        </Typography>
        <Typography
          aria-live="polite"
          sx={{ color: 'primary.main', fontSize: '0.875rem', fontWeight: 700 }}
        >
          {table.selected.size} selected
        </Typography>
      </Stack>
      <ProjectsDataTable table={table} />
      <Divider />
      <ProjectsPagination table={table} />
    </Card>
  );
}
