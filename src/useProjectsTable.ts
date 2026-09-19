import { useState } from 'react';
import { exportProjects } from './exportProjects';
import {
  getProjectRows,
  type Density,
  type SortDirection,
  type SortKey,
  type StatusFilter,
} from './projectTableData';

export function useProjectsTable() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All statuses');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [density, setDensity] = useState<Density>('comfortable');
  const rows = getProjectRows(search, status, sortKey, sortDirection);
  const pageRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const selectedOnPage = pageRows.filter(({ id }) => selected.has(id)).length;
  const allOnPageSelected =
    pageRows.length > 0 && selectedOnPage === pageRows.length;

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortKey(null);
      setSortDirection('asc');
    }
  };
  const togglePage = () =>
    setSelected((current) => {
      const next = new Set(current);
      pageRows.forEach(({ id }) =>
        allOnPageSelected ? next.delete(id) : next.add(id),
      );
      return next;
    });
  const toggleProject = (id: number) =>
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
    sortKey,
    sortDirection,
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
