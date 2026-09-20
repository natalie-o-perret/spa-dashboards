import { computed, nextTick, ref, watch } from 'vue'
import type { DataTableSortItem } from 'vuetify'
import { exportProjects } from './exportCsv'
import { formatBudget, formatDate } from './format'
import type { Project } from './projectSchema'
import { projects } from './projects'
import type { StatusFilter, TableDensity } from './tableConfig'

type SortKey = Exclude<keyof Project, 'id'>
type ProjectSort =
  | { readonly _tag: 'Unsorted' }
  | { readonly _tag: 'Sorted'; readonly key: SortKey; readonly order: 'asc' | 'desc' }
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

export function useProjectTable() {
  const search = ref('')
  const status = ref<StatusFilter>('All statuses')
  const selected = ref<number[]>([])
  const page = ref(1)
  const itemsPerPage = ref(5)
  const density = ref<TableDensity>('comfortable')
  const sort = ref<ProjectSort>({ _tag: 'Unsorted' })
  const sortBy = computed<readonly DataTableSortItem[]>(() =>
    sort.value._tag === 'Sorted' ? [{ key: sort.value.key, order: sort.value.order }] : [],
  )
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
    const activeSort = sort.value
    if (activeSort._tag === 'Unsorted') return filteredProjects.value
    const direction = activeSort.order === 'desc' ? -1 : 1
    return [...filteredProjects.value].sort((left, right) => {
      const leftValue = left[activeSort.key]
      const rightValue = right[activeSort.key]
      const result =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : collator.compare(String(leftValue), String(rightValue))
      return result * direction
    })
  })

  watch([search, status, itemsPerPage], () => (page.value = 1))
  async function updateSortBy(value: readonly DataTableSortItem[]) {
    const activeSort = value[0]
    sorting = true
    sort.value =
      !activeSort || activeSort.order === false
        ? { _tag: 'Unsorted' }
        : {
            _tag: 'Sorted',
            key: activeSort.key as SortKey,
            order: activeSort.order === 'desc' ? 'desc' : 'asc',
          }
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
