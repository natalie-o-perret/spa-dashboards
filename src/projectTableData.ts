import { projects, type Project, type ProjectStatus } from './projects';

export type SortKey = keyof Omit<Project, 'id'>;
export type SortDirection = 'asc' | 'desc';
export type StatusFilter = 'All statuses' | ProjectStatus;
export type Density = 'comfortable' | 'compact';

export const columns: ReadonlyArray<{
  key: SortKey;
  label: string;
  align?: 'left' | 'right';
}> = [
  { key: 'name', label: 'Project' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
  { key: 'progress', label: 'Progress' },
  { key: 'due', label: 'Due date' },
  { key: 'budget', label: 'Budget', align: 'right' },
];

export const statuses: readonly StatusFilter[] = [
  'All statuses',
  'On track',
  'At risk',
  'Blocked',
  'Complete',
];

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const budgetFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});
const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});

export function formatDate(value: string) {
  const [year, month, day] = value.split('-');
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

export function formatBudget(value: number) {
  return budgetFormatter.format(value);
}

export function getProjectRows(
  search: string,
  status: StatusFilter,
  sortKey: SortKey | null,
  direction: SortDirection,
) {
  const query = search.trim().toLocaleLowerCase('en');
  const rows = projects.filter((project) => {
    if (status !== 'All statuses' && project.status !== status) return false;
    const fields = [
      project.name,
      project.owner,
      project.status,
      project.priority,
      project.progress,
      `${project.progress}%`,
      project.due,
      formatDate(project.due),
      project.budget,
      formatBudget(project.budget),
    ];
    return fields.some((value) =>
      String(value).toLocaleLowerCase('en').includes(query),
    );
  });
  if (!sortKey) return rows;
  return rows.sort((leftProject, rightProject) => {
    const left = leftProject[sortKey];
    const right = rightProject[sortKey];
    const comparison =
      typeof left === 'number' && typeof right === 'number'
        ? left - right
        : collator.compare(String(left), String(right));
    return comparison
      ? comparison * (direction === 'asc' ? 1 : -1)
      : leftProject.id - rightProject.id;
  });
}
