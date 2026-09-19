import { MatTableDataSource } from '@angular/material/table';
import { PROJECTS, Project } from '../app.data';
import { formatBudget, formatDate } from './project-format';
import { TableFilter } from './project-table.types';

export function createProjectDataSource(): MatTableDataSource<Project> {
  const dataSource = new MatTableDataSource<Project>([...PROJECTS]);
  dataSource.filterPredicate = (project, rawFilter) => {
    const filter = JSON.parse(rawFilter) as TableFilter;
    const matchesStatus = filter.status === 'All statuses' || project.status === filter.status;
    const searchable = [
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
    ]
      .join(' ')
      .toLowerCase();
    return matchesStatus && searchable.includes(filter.search);
  };
  dataSource.sortingDataAccessor = (project, column) => {
    switch (column) {
      case 'name':
        return project.name;
      case 'owner':
        return project.owner;
      case 'status':
        return project.status;
      case 'priority':
        return project.priority;
      case 'progress':
        return project.progress;
      case 'due':
        return project.due;
      case 'budget':
        return project.budget;
      default:
        return project.id;
    }
  };
  return dataSource;
}
