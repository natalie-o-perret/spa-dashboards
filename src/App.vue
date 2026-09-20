<script setup lang="ts">
import DashboardAnalytics from './features/portfolio/DashboardAnalytics.vue'
import DashboardOverview from './features/portfolio/DashboardOverview.vue'
import ProjectTable from './features/projects/ProjectTable.vue'
import DashboardShell from './shell/DashboardShell.vue'
</script>

<template>
  <DashboardShell>
    <DashboardOverview />
    <DashboardAnalytics />
    <ProjectTable />
  </DashboardShell>
</template>
