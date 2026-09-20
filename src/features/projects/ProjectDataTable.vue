<script setup lang="ts">
import type { DataTableSortItem } from 'vuetify'
import { formatBudget, formatDate } from './format'
import type { Project } from './projectSchema'
import type { TableDensity } from './tableConfig'
import { headers, itemsPerPageOptions, priorityColors, statusColors } from './tableConfig'
defineProps<{
  selected: number[]
  itemsPerPage: number
  page: number
  sortBy: readonly DataTableSortItem[]
  density: TableDensity
  items: readonly Project[]
}>()
defineEmits<{
  'update:selected': [value: number[]]
  'update:itemsPerPage': [value: number]
  'update:page': [value: number]
  'update:sortBy': [value: readonly DataTableSortItem[]]
  clear: []
}>()
</script>

<template>
  <div class="table-region" role="region" aria-labelledby="projects-heading" tabindex="0">
    <v-data-table
      :model-value="selected"
      class="project-table"
      :items-per-page="itemsPerPage"
      :page="page"
      :sort-by="sortBy"
      :density="density"
      :headers="headers"
      :items="items"
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
      @update:model-value="$emit('update:selected', $event)"
      @update:items-per-page="$emit('update:itemsPerPage', $event)"
      @update:page="$emit('update:page', $event)"
      @update:sort-by="$emit('update:sortBy', $event)"
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
          <v-btn color="primary" variant="text" @click="$emit('clear')">Clear filters</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped src="./styles/project-data.css"></style>
