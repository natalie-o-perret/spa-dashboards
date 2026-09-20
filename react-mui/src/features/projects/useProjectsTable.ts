import { useState } from 'react';
import { exportProjects } from './exportProjects';
import type { Project } from './projectSchema';
import {
  getProjectRows,
  type Density,
  type Sort,
  type SortKey,
  type StatusFilter,
} from './projectTableData';

export function useProjectsTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All statuses');
  const [sort, setSort] = useState<Sort>({ type: 'none' });
  const [selected, setSelected] = useState<Set<Project['id']>>(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [density, setDensity] = useState<Density>('comfortable');
  const rows = getProjectRows(search, status, sort);
  const pageRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const selectedOnPage = pageRows.filter(({ id }) => selected.has(id)).length;
  const allOnPageSelected =
    pageRows.length > 0 && selectedOnPage === pageRows.length;

  const handleSort = (key: SortKey) =>
    setSort((current) => {
      if (current.type === 'none' || current.key !== key) {
        return { type: 'sorted', key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { type: 'sorted', key, direction: 'desc' };
      }
      return { type: 'none' };
    });
  const togglePage = () =>
    setSelected((current) => {
      const next = new Set(current);
      pageRows.forEach(({ id }) =>
        allOnPageSelected ? next.delete(id) : next.add(id),
      );
      return next;
    });
  const toggleProject = (id: Project['id']) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const clearFilters = () => {
    setSearch('');
    setStatus('All statuses');
    setPage(0);
  };

  return {
    search,
    status,
    sort,
    selected,
    page,
    rowsPerPage,
    density,
    rows,
    pageRows,
    selectedOnPage,
    allOnPageSelected,
    setSearch,
    setStatus,
    setPage,
    setRowsPerPage,
    setDensity,
    handleSort,
    togglePage,
    toggleProject,
    clearFilters,
    exportCsv: () => exportProjects(rows),
  };
}

export type ProjectsTableState = ReturnType<typeof useProjectsTable>;
