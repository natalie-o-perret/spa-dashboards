<script setup lang="ts">
import type { StatusFilter } from './tableConfig'
import { statusColors } from './tableConfig'

defineProps<{ status: StatusFilter }>()
</script>

<template>
  <template v-if="status === 'All statuses'">{{ status }}</template>
  <v-chip v-else :color="statusColors[status]" size="small" variant="tonal">
    {{ status }}
  </v-chip>
</template>
