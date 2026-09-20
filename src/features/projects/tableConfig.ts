import type { DataTableHeader } from 'vuetify'
import type { Project, ProjectPriority, ProjectStatus } from './projectSchema'

export type StatusFilter = 'All statuses' | ProjectStatus
export type TableDensity = 'comfortable' | 'compact'

export const headers: DataTableHeader<Project>[] = [
  { title: 'Project', key: 'name', value: 'name', minWidth: 210 },
  { title: 'Owner', key: 'owner', value: 'owner', minWidth: 150 },
  { title: 'Status', key: 'status', value: 'status', minWidth: 125 },
  { title: 'Priority', key: 'priority', value: 'priority', minWidth: 110 },
  { title: 'Progress', key: 'progress', value: 'progress', minWidth: 165 },
  { title: 'Due date', key: 'due', value: 'due', minWidth: 130 },
  { title: 'Budget', key: 'budget', value: 'budget', align: 'end', minWidth: 120 },
]

export const statusOptions: readonly StatusFilter[] = [
  'All statuses',
  'On track',
  'At risk',
  'Blocked',
  'Complete',
]
export const itemsPerPageOptions = [5, 10, 20]
export const statusColors: Record<ProjectStatus, string> = {
  'On track': 'success',
  'At risk': 'warning',
  Blocked: 'error',
  Complete: 'primary',
}
export const priorityColors: Record<ProjectPriority, string> = {
  Critical: 'error',
  High: 'warning',
  Medium: 'info',
  Low: 'secondary',
}
