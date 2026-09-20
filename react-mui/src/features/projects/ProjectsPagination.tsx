import { TablePagination } from '@mui/material';
import type { ProjectsTableState } from './useProjectsTable';

export default function ProjectsPagination({
  table,
}: {
  table: ProjectsTableState;
}) {
  return (
    <TablePagination
      component="div"
      count={table.rows.length}
      page={table.page}
      onPageChange={(_, nextPage) => table.setPage(nextPage)}
      rowsPerPage={table.rowsPerPage}
      onRowsPerPageChange={(event) => {
        table.setRowsPerPage(Number.parseInt(event.target.value, 10));
        table.setPage(0);
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
  );
}
