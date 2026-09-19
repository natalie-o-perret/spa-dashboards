import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { columns } from './projectTableData';
import type { ProjectsTableState } from './useProjectsTable';

export default function ProjectsTableHead({
  table,
}: {
  table: ProjectsTableState;
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={table.allOnPageSelected}
            indeterminate={table.selectedOnPage > 0 && !table.allOnPageSelected}
            onChange={table.togglePage}
            slotProps={{
              input: { 'aria-label': 'Select all projects on this page' },
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            sortDirection={
              table.sortKey === column.key ? table.sortDirection : false
            }
          >
            <TableSortLabel
              active={table.sortKey === column.key}
              direction={
                table.sortKey === column.key ? table.sortDirection : 'asc'
              }
              onClick={() => table.handleSort(column.key)}
              aria-label={`Sort by ${column.label}${
                table.sortKey === column.key
                  ? `, currently ${table.sortDirection}ending`
                  : ''
              }`}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
