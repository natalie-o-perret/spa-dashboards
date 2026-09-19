import { ProjectStatus } from '../app.data';

export type StatusFilter = 'All statuses' | ProjectStatus;
export type Density = 'comfortable' | 'compact';

export interface TableFilter {
  search: string;
  status: StatusFilter;
}
