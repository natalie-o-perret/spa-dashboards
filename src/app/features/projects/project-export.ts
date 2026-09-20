import { Project } from './project.schema';

function csvCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export function exportProjects(document: Document, projects: Project[]): void {
  const csv = [
    ['ID', 'Project', 'Owner', 'Status', 'Priority', 'Progress', 'Due date', 'Budget'],
    ...projects.map((project) => [
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
    .map((row) => row.map(csvCell).join(','))
    .join('\r\n');
  const urlApi = document.defaultView?.URL;
  if (!urlApi?.createObjectURL) return;

  const url = urlApi.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'meridian-projects.csv';
  document.body.append(link);
  link.click();
  link.remove();
  urlApi.revokeObjectURL(url);
}
