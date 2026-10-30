import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
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
          <Tooltip
            title={
              table.allOnPageSelected
                ? 'Deselect all projects on this page'
                : 'Select all projects on this page'
            }
          >
            <Checkbox
              checked={table.allOnPageSelected}
              indeterminate={
                table.selectedOnPage > 0 && !table.allOnPageSelected
              }
              onChange={table.togglePage}
              slotProps={{
                input: {
                  'aria-label': 'Select all projects on this page',
                  'aria-checked':
                    table.selectedOnPage > 0 && !table.allOnPageSelected
                      ? 'mixed'
                      : table.allOnPageSelected,
                },
              }}
            />
          </Tooltip>
        </TableCell>
        {columns.map((column) => {
          const active =
            table.sort.type === 'sorted' && table.sort.key === column.key;
          const direction =
            table.sort.type === 'sorted' && table.sort.key === column.key
              ? table.sort.direction
              : 'asc';
          return (
            <TableCell
              key={column.key}
              align={column.align}
              sortDirection={active ? direction : false}
            >
              <Tooltip title={`Sort by ${column.label}`}>
                <TableSortLabel
                  active={active}
                  direction={direction}
                  onClick={() => table.handleSort(column.key)}
                  aria-label={`Sort by ${column.label}${
                    active ? `, currently ${direction}ending` : ''
                  }`}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
