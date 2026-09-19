<script setup lang="ts">
import type { StatusFilter, TableDensity } from '../table/config'
import { statusOptions } from '../table/config'

const search = defineModel<string>('search', { required: true })
const status = defineModel<StatusFilter>('status', { required: true })
const density = defineModel<TableDensity>('density', { required: true })
defineEmits<{ clear: [] }>()
</script>

<template>
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
      <v-btn value="comfortable" prepend-icon="mdi-view-sequential-outline">Comfortable</v-btn>
      <v-btn value="compact" prepend-icon="mdi-view-headline">Compact</v-btn>
    </v-btn-toggle>
    <v-btn
      class="clear-filters"
      variant="text"
      :disabled="!search && status === 'All statuses'"
      @click="$emit('clear')"
    >
      Clear filters
    </v-btn>
  </div>
</template>

<style scoped src="../styles/project-controls.css"></style>
