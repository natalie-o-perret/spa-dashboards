import { computed, nextTick, ref, watch } from 'vue'
import type { DataTableSortItem } from 'vuetify'
import { projects, type Project } from '../data/projects'
import type { StatusFilter, TableDensity } from '../table/config'
import { exportProjects } from '../table/exportCsv'
import { formatBudget, formatDate } from '../table/format'

type SortableProjectKey = Exclude<keyof Project, 'id'>
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

export function useProjectTable() {
  const search = ref('')
  const status = ref<StatusFilter>('All statuses')
  const selected = ref<number[]>([])
  const page = ref(1)
  const itemsPerPage = ref(5)
  const density = ref<TableDensity>('comfortable')
  const sortBy = ref<readonly DataTableSortItem[]>([])
  let sorting = false

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

  return {
    search,
    status,
    selected,
    page,
    itemsPerPage,
    density,
    sortBy,
    filteredProjects,
    updateSortBy,
    updatePage,
    clearFilters,
    exportCsv: () => exportProjects(sortedFilteredProjects.value),
  }
}
