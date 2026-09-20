import type { Project } from './projectSchema';

function quoteCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function exportProjects(rows: readonly Project[]) {
  const csv = [
    [
      'ID',
      'Project',
      'Owner',
      'Status',
      'Priority',
      'Progress',
      'Due date',
      'Budget',
    ],
    ...rows.map((project) => [
      project.id,
      project.name,
      project.owner,
      project.status,
      project.priority,
      `${project.progress}%`,
      project.due,
      project.budget,
    ]),
  ]
    .map((row) => row.map(quoteCsv).join(','))
    .join('\r\n');
  const url = URL.createObjectURL(
    new Blob([csv], { type: 'text/csv;charset=utf-8' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = 'meridian-projects.csv';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
