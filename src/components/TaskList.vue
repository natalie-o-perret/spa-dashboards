<script setup lang="ts">
import { computed, ref } from 'vue'

type TaskStatus = 'todo' | 'progress' | 'done'
type TaskFilter = 'all' | TaskStatus

const tasks = [
  {
    title: 'Water rooftop planters',
    zone: 'Rooftop beds',
    people: 'Mina and Jules',
    due: 'Today, 10:30',
    status: 'progress',
  },
  {
    title: 'Turn compost bay three',
    zone: 'Compost yard',
    people: 'Owen',
    due: 'Today, 13:00',
    status: 'todo',
  },
  {
    title: 'Pack the market harvest',
    zone: 'Wash station',
    people: 'Amara and Theo',
    due: 'Today, 16:30',
    status: 'progress',
  },
  {
    title: 'Sow winter salad leaves',
    zone: 'Greenhouse',
    people: 'Unassigned',
    due: 'Tomorrow, 09:00',
    status: 'todo',
  },
  {
    title: 'Clean and oil shared tools',
    zone: 'Tool shed',
    people: 'Priya',
    due: 'Completed yesterday',
    status: 'done',
  },
] as const satisfies ReadonlyArray<{ status: TaskStatus } & Record<string, string>>

const filters: ReadonlyArray<{ label: string; value: TaskFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'progress' },
  { label: 'Done', value: 'done' },
]

const statusDetails: Record<TaskStatus, { label: string; icon: string; color: string }> = {
  todo: { label: 'To do', icon: 'mdi-circle-outline', color: 'warning' },
  progress: { label: 'In progress', icon: 'mdi-progress-clock', color: 'info' },
  done: { label: 'Done', icon: 'mdi-check-circle-outline', color: 'success' },
}

const selectedStatus = ref<TaskFilter>('all')
const filteredTasks = computed(() =>
  selectedStatus.value === 'all'
    ? tasks
    : tasks.filter((task) => task.status === selectedStatus.value),
)

const filterCount = (filter: TaskFilter) =>
  filter === 'all' ? tasks.length : tasks.filter((task) => task.status === filter).length
</script>

<template>
  <v-card class="panel-card task-card" height="100%">
    <v-card-item>
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Fieldwork</p>
          <h2 id="tasks-heading">Upcoming tasks</h2>
        </div>
        <v-chip color="primary" size="small" variant="tonal">{{ tasks.length }} scheduled</v-chip>
      </div>
    </v-card-item>

    <v-card-text>
      <v-btn-toggle
        v-model="selectedStatus"
        class="task-filters"
        color="primary"
        mandatory
        variant="outlined"
        aria-label="Filter tasks by status"
      >
        <v-btn
          v-for="filter in filters"
          :key="filter.value"
          :value="filter.value"
          :data-filter="filter.value"
          size="small"
          :aria-label="`${filter.label}: ${filterCount(filter.value)} tasks`"
        >
          {{ filter.label }}
          <span class="filter-count" aria-hidden="true">{{ filterCount(filter.value) }}</span>
        </v-btn>
      </v-btn-toggle>

      <p class="sr-only" aria-live="polite">{{ filteredTasks.length }} tasks shown</p>

      <ul class="task-list" aria-labelledby="tasks-heading">
        <li
          v-for="task in filteredTasks"
          :key="task.title"
          class="task-row"
          :class="{ 'task-row--done': task.status === 'done' }"
          :data-status="task.status"
          data-task
        >
          <v-icon
            class="task-icon"
            :color="statusDetails[task.status].color"
            :icon="statusDetails[task.status].icon"
            aria-hidden="true"
          />
          <div class="task-copy">
            <strong>{{ task.title }}</strong>
            <span>{{ task.zone }} / {{ task.people }}</span>
          </div>
          <div class="task-meta">
            <v-chip :color="statusDetails[task.status].color" size="x-small" variant="tonal">
              {{ statusDetails[task.status].label }}
            </v-chip>
            <span
              ><v-icon icon="mdi-clock-outline" size="14" aria-hidden="true" />{{ task.due }}</span
            >
          </div>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.task-filters {
  display: flex;
  width: fit-content;
  max-width: 100%;
  margin-bottom: 10px;
  overflow-x: auto;
}

.task-filters .v-btn {
  min-width: auto;
  padding-inline: 14px;
  text-transform: none;
  letter-spacing: 0;
}

.filter-count {
  min-width: 20px;
  margin-left: 7px;
  padding: 1px 5px;
  border-radius: 20px;
  background: rgba(var(--v-theme-on-surface), 0.08);
  font-size: 0.68rem;
}

.task-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px 4px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.09);
}

.task-row:last-child {
  border-bottom: 0;
}

.task-row--done .task-copy strong {
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}

.task-icon {
  align-self: start;
  margin-top: 3px;
}

.task-copy {
  display: grid;
  min-width: 0;
}

.task-copy strong {
  font-size: 0.92rem;
  line-height: 1.4;
}

.task-copy span,
.task-meta span {
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.75rem;
}

.task-meta {
  display: grid;
  justify-items: end;
  gap: 7px;
}

.task-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .task-row {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .task-meta {
    grid-column: 2;
    grid-template-columns: auto 1fr;
    justify-items: start;
  }
}
</style>
