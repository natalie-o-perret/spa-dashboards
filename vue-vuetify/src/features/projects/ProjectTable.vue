<script setup lang="ts">
import ProjectDataTable from './ProjectDataTable.vue'
import ProjectTableControls from './ProjectTableControls.vue'
import { useProjectTable } from './useProjectTable'

const table = useProjectTable()
</script>

<template>
  <section class="projects-section" aria-label="Portfolio projects">
    <v-card id="projects" class="table-card">
      <v-card-item class="table-heading">
        <div>
          <h2 id="projects-heading">Projects</h2>
          <p>18 projects across the current portfolio</p>
        </div>
        <v-btn
          prepend-icon="mdi-download-outline"
          v-tooltip:bottom="{ text: 'Export all matching projects as CSV', id: 'export-tooltip' }"
          color="primary"
          variant="flat"
          :disabled="table.filteredProjects.value.length === 0"
          @click="table.exportCsv"
        >
          Export CSV
        </v-btn>
      </v-card-item>
      <v-card-text class="table-content">
        <ProjectTableControls
          v-model:search="table.search.value"
          v-model:status="table.status.value"
          v-model:density="table.density.value"
          @clear="table.clearFilters"
        />
        <div class="table-summary">
          <span aria-live="polite">
            {{ table.filteredProjects.value.length }}
            {{ table.filteredProjects.value.length === 1 ? 'project' : 'projects' }} shown
          </span>
          <span aria-live="polite">{{ table.selected.value.length }} selected</span>
        </div>
      </v-card-text>
      <ProjectDataTable
        :selected="table.selected.value"
        :items-per-page="table.itemsPerPage.value"
        :page="table.page.value"
        :sort-by="table.sortBy.value"
        :density="table.density.value"
        :items="table.filteredProjects.value"
        @update:selected="table.selected.value = $event"
        @update:items-per-page="table.itemsPerPage.value = $event"
        @update:page="table.updatePage"
        @update:sort-by="table.updateSortBy"
        @clear="table.clearFilters"
      />
    </v-card>
  </section>
</template>

<style scoped src="./styles/project-card.css"></style>
