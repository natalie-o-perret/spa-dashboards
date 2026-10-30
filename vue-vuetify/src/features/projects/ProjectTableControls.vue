<script setup lang="ts">
import type { StatusFilter, TableDensity } from './tableConfig'
import { statusOptions } from './tableConfig'
import ProjectStatusBadge from './ProjectStatusBadge.vue'

const search = defineModel<string>('search', { required: true })
const status = defineModel<StatusFilter>('status', { required: true })
const density = defineModel<TableDensity>('density', { required: true })
defineEmits<{ clear: [] }>()
</script>

<template>
  <div class="table-controls">
    <v-text-field
      v-model="search"
      v-tooltip:bottom="{ text: 'Search any displayed project field', id: 'search-tooltip' }"
      data-testid="project-search"
      label="Search projects"
      prepend-inner-icon="mdi-magnify"
      clearable
      hide-details
      variant="outlined"
    />
    <v-select
      v-model="status"
      v-tooltip:bottom="{ text: 'Show projects with a matching status', id: 'status-tooltip' }"
      data-testid="status-filter"
      :items="statusOptions"
      label="Status"
      hide-details
      variant="outlined"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" role="option">
          <template #title><ProjectStatusBadge :status="item" /></template>
        </v-list-item>
      </template>
      <template #selection="{ item }"><ProjectStatusBadge :status="item" /></template>
    </v-select>
    <v-btn-toggle
      v-model="density"
      class="density-toggle"
      aria-label="Table density"
      color="primary"
      divided
      mandatory
      variant="outlined"
    >
      <v-btn
        value="comfortable"
        v-tooltip:bottom="{ text: 'Show roomier project rows', id: 'comfortable-tooltip' }"
        >Comfortable</v-btn
      >
      <v-btn
        value="compact"
        v-tooltip:bottom="{ text: 'Fit more project rows on screen', id: 'compact-tooltip' }"
        >Compact</v-btn
      >
    </v-btn-toggle>
    <v-btn
      class="clear-filters"
      v-tooltip:bottom="{ text: 'Reset search and status filters', id: 'clear-filters-tooltip' }"
      variant="text"
      :disabled="!search && status === 'All statuses'"
      @click="$emit('clear')"
    >
      Clear filters
    </v-btn>
  </div>
</template>

<style scoped src="./styles/project-controls.css"></style>
