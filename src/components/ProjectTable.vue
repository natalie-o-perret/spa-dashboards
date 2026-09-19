<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { DataTableHeader, DataTableSortItem } from 'vuetify'
import { projects, type Project, type ProjectPriority, type ProjectStatus } from '../data/projects'

type StatusFilter = 'All statuses' | ProjectStatus
type TableDensity = 'comfortable' | 'compact'
type SortableProjectKey = Exclude<keyof Project, 'id'>

const headers: DataTableHeader<Project>[] = [
  { title: 'Project', key: 'name', value: 'name', minWidth: 210 },
  { title: 'Owner', key: 'owner', value: 'owner', minWidth: 150 },
  { title: 'Status', key: 'status', value: 'status', minWidth: 125 },
  { title: 'Priority', key: 'priority', value: 'priority', minWidth: 110 },
  { title: 'Progress', key: 'progress', value: 'progress', minWidth: 165 },
  { title: 'Due date', key: 'due', value: 'due', minWidth: 130 },
  { title: 'Budget', key: 'budget', value: 'budget', align: 'end', minWidth: 120 },
]

const statusOptions: readonly StatusFilter[] = [
  'All statuses',
  'On track',
  'At risk',
  'Blocked',
  'Complete',
]
const itemsPerPageOptions = [5, 10, 20]
const statusColors: Record<ProjectStatus, string> = {
  'On track': 'success',
  'At risk': 'warning',
  Blocked: 'error',
  Complete: 'primary',
}
const priorityColors: Record<ProjectPriority, string> = {
  Critical: 'error',
  High: 'warning',
  Medium: 'info',
  Low: 'secondary',
}
const monthNames = [
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
]
const budgetFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

const search = ref('')
const status = ref<StatusFilter>('All statuses')
const selected = ref<number[]>([])
const page = ref(1)
const itemsPerPage = ref(5)
const density = ref<TableDensity>('comfortable')
const sortBy = ref<readonly DataTableSortItem[]>([])
let sorting = false

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`
}

function formatBudget(value: number) {
  return budgetFormatter.format(value)
}

const filteredProjects = computed(() => {
  const query = search.value.trim().toLocaleLowerCase()

  return projects.filter((project) => {
    if (status.value !== 'All statuses' && project.status !== status.value) return false
    if (!query) return true

    return [
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
    ].some((value) => String(value).toLocaleLowerCase().includes(query))
  })
})

const sortedFilteredProjects = computed(() => {
  const activeSort = sortBy.value[0]
  if (!activeSort || activeSort.order === false) return filteredProjects.value

  const direction = activeSort.order === 'desc' ? -1 : 1
  const key = activeSort.key as SortableProjectKey

  return filteredProjects.value
    .map((project, index) => ({ project, index }))
    .sort((left, right) => {
      const leftValue = left.project[key]
      const rightValue = right.project[key]
      const result =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : collator.compare(String(leftValue), String(rightValue))
      return result * direction || left.index - right.index
    })
    .map(({ project }) => project)
})

watch([search, status, itemsPerPage], () => (page.value = 1))

async function updateSortBy(value: readonly DataTableSortItem[]) {
  sorting = true
  sortBy.value = value
  await nextTick()
  sorting = false
}

function updatePage(value: number) {
  if (!sorting) page.value = value
}

function clearFilters() {
  search.value = ''
  status.value = 'All statuses'
}

function exportCsv() {
  if (!filteredProjects.value.length) return

  const rows = [
    ['ID', 'Project', 'Owner', 'Status', 'Priority', 'Progress', 'Due date', 'Budget'],
    ...sortedFilteredProjects.value.map((project) => [
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
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\r\n')
  const url = globalThis.URL.createObjectURL(
    new globalThis.Blob([csv], { type: 'text/csv;charset=utf-8' }),
  )
  const link = globalThis.document.createElement('a')
  link.href = url
  link.download = 'meridian-projects.csv'
  globalThis.document.body.append(link)
  link.click()
  link.remove()
  globalThis.URL.revokeObjectURL(url)
}
</script>

<template>
  <v-card id="projects" class="table-card">
    <v-card-item class="table-heading">
      <div>
        <h2 id="projects-heading">Projects</h2>
        <p>18 projects across the current portfolio</p>
      </div>
      <v-btn
        prepend-icon="mdi-download-outline"
        color="primary"
        variant="flat"
        :disabled="filteredProjects.length === 0"
        @click="exportCsv"
      >
        Export CSV
      </v-btn>
    </v-card-item>

    <v-card-text class="table-content">
      <div class="table-controls">
        <v-text-field
          v-model="search"
          data-testid="project-search"
          label="Search projects"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          variant="outlined"
        />
        <v-select
          v-model="status"
          data-testid="status-filter"
          :items="statusOptions"
          label="Status"
          hide-details
          variant="outlined"
        />
        <v-btn-toggle
          v-model="density"
          class="density-toggle"
          aria-label="Table density"
          color="primary"
          divided
          mandatory
          variant="outlined"
        >
          <v-btn value="comfortable" prepend-icon="mdi-view-sequential-outline">
            Comfortable
          </v-btn>
          <v-btn value="compact" prepend-icon="mdi-view-headline">Compact</v-btn>
        </v-btn-toggle>
        <v-btn
          class="clear-filters"
          variant="text"
          :disabled="!search && status === 'All statuses'"
          @click="clearFilters"
        >
          Clear filters
        </v-btn>
      </div>

      <div class="table-summary">
        <span aria-live="polite"
          >{{ filteredProjects.length }}
          {{ filteredProjects.length === 1 ? 'project' : 'projects' }} shown</span
        >
        <span aria-live="polite">{{ selected.length }} selected</span>
      </div>
    </v-card-text>

    <div class="table-region" role="region" aria-labelledby="projects-heading" tabindex="0">
      <v-data-table
        v-model="selected"
        v-model:items-per-page="itemsPerPage"
        class="project-table"
        :page="page"
        :sort-by="sortBy"
        :density="density"
        :headers="headers"
        :items="filteredProjects"
        :items-per-page-options="itemsPerPageOptions"
        :mobile="false"
        :must-sort="false"
        color="primary"
        item-value="id"
        items-per-page-text="Rows per page:"
        first-page-label="First page"
        prev-page-label="Previous page"
        next-page-label="Next page"
        last-page-label="Last page"
        select-all-label="Select all projects on this page"
        select-strategy="page"
        show-select
        @update:page="updatePage"
        @update:sort-by="updateSortBy"
      >
        <template v-slot:[`item.data-table-select`]="{ item, props }">
          <v-checkbox-btn v-bind="props" :aria-label="`Select ${item.name}`" />
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <strong class="project-name">{{ item.name }}</strong>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="statusColors[item.status]" size="small" variant="tonal">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:[`item.priority`]="{ item }">
          <v-chip :color="priorityColors[item.priority]" size="small" variant="outlined">
            {{ item.priority }}
          </v-chip>
        </template>

        <template v-slot:[`item.progress`]="{ item }">
          <div class="progress-cell">
            <v-progress-linear
              :aria-label="`${item.name} progress: ${item.progress}%`"
              :model-value="item.progress"
              color="primary"
              bg-opacity="0.12"
              height="6"
              rounded
            />
            <span>{{ item.progress }}%</span>
          </div>
        </template>

        <template v-slot:[`item.due`]="{ item }">
          <time :datetime="item.due">{{ formatDate(item.due) }}</time>
        </template>

        <template v-slot:[`item.budget`]="{ item }">
          <span class="budget-cell">{{ formatBudget(item.budget) }}</span>
        </template>

        <template #no-data>
          <div class="no-results" data-testid="no-results">
            <v-icon icon="mdi-magnify-close" size="32" aria-hidden="true" />
            <strong>No projects found</strong>
            <span>No projects match your current search and status filters.</span>
            <v-btn color="primary" variant="text" @click="clearFilters">Clear filters</v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<style scoped>
.table-heading {
  padding: 24px 24px 18px;
}

.table-heading :deep(.v-card-item__content) {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
}

.table-heading h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.table-heading p {
  margin: 5px 0 0;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.82rem;
}

.table-content {
  padding: 0 24px 14px;
}

.table-controls {
  display: grid;
  grid-template-columns: minmax(230px, 1fr) 190px auto auto;
  gap: 12px;
  align-items: center;
}

.table-controls :deep(.v-field) {
  border-radius: 10px;
}

.density-toggle {
  height: 56px;
}

.density-toggle .v-btn {
  height: 56px;
  padding-inline: 13px;
  font-size: 0.72rem;
  letter-spacing: 0;
  text-transform: none;
}

.clear-filters {
  white-space: nowrap;
}

.table-summary {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: 13px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.76rem;
}

.table-summary span:last-child {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
}

.table-region {
  max-width: 100%;
  overflow-x: auto;
  border-top: 1px solid rgb(var(--v-theme-divider));
}

.table-region:focus-visible {
  outline-offset: -3px !important;
}

.project-table {
  background: transparent;
}

.project-table :deep(.v-table__wrapper) {
  overflow: visible;
}

.project-table :deep(table) {
  min-width: 1080px;
}

.project-table :deep(th) {
  height: 50px;
  background: rgb(var(--v-theme-subtle));
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.025em;
}

.project-table :deep(td) {
  border-color: rgb(var(--v-theme-divider)) !important;
  font-size: 0.8rem;
}

.project-table :deep(tbody tr:hover) {
  background: rgba(var(--v-theme-primary), 0.035);
}

.project-table :deep(.v-data-table-footer) {
  min-height: 66px;
  border-top: 1px solid rgb(var(--v-theme-divider));
}

.project-table :deep(.v-data-table-footer__items-per-page) {
  font-size: 0.75rem;
}

.project-name {
  font-weight: 700;
}

.progress-cell {
  display: grid;
  grid-template-columns: 1fr 36px;
  gap: 9px;
  align-items: center;
  min-width: 125px;
}

.progress-cell span,
.budget-cell {
  font-variant-numeric: tabular-nums;
  font-weight: 650;
}

.budget-cell {
  white-space: nowrap;
}

.no-results {
  display: grid;
  justify-items: center;
  padding: 40px 16px;
  color: rgb(var(--v-theme-on-surface-variant));
  text-align: center;
}

.no-results strong {
  margin-top: 10px;
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.95rem;
}

.no-results span {
  margin: 4px 0 8px;
  font-size: 0.78rem;
}

@media (max-width: 1199px) {
  .table-controls {
    grid-template-columns: minmax(220px, 1fr) 190px;
  }

  .density-toggle {
    width: fit-content;
  }

  .clear-filters {
    justify-self: start;
  }
}

@media (max-width: 699px) {
  .table-heading {
    padding: 20px 18px 15px;
  }

  .table-heading :deep(.v-card-item__content) {
    align-items: stretch;
    flex-direction: column;
  }

  .table-heading .v-btn {
    align-self: flex-start;
  }

  .table-content {
    padding-inline: 18px;
  }

  .table-controls {
    grid-template-columns: 1fr;
  }

  .density-toggle {
    width: 100%;
  }

  .density-toggle .v-btn {
    flex: 1;
  }

  .project-table :deep(.v-data-table-footer) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px 14px;
    padding-block: 10px;
  }
}
</style>
