<script setup lang="ts">
const drawer = defineModel<boolean>({ required: true })
defineProps<{ permanent: boolean }>()

const navigation = [
  { label: 'Overview', icon: 'mdi-view-dashboard-outline', href: '#overview' },
  { label: 'Analytics', icon: 'mdi-chart-line', href: '#analytics' },
  { label: 'Projects', icon: 'mdi-briefcase-outline', href: '#projects' },
  { label: 'Team', icon: 'mdi-account-group-outline', href: '#team' },
]

function close(permanent: boolean) {
  if (!permanent) drawer.value = false
}
</script>

<template>
  <v-navigation-drawer
    id="mobile-navigation"
    v-model="drawer"
    class="meridian-drawer"
    :permanent="permanent"
    :temporary="!permanent"
    :capture-focus="!permanent"
    :retain-focus="!permanent"
    width="252"
    tag="aside"
    aria-label="Portfolio navigation"
    @keydown.esc.stop="drawer = false"
  >
    <v-btn
      v-if="!permanent"
      class="drawer-close"
      icon="mdi-close"
      aria-label="Close navigation"
      v-tooltip:bottom="{ text: 'Close navigation', id: 'close-navigation-tooltip' }"
      variant="text"
      @click="drawer = false"
    />
    <a class="brand-lockup" href="#overview" @click="close(permanent)">
      <span class="brand-mark" aria-hidden="true">
        <v-icon icon="mdi-chart-timeline-variant-shimmer" />
      </span>
      <span class="brand-copy">
        <strong>Meridian</strong>
        <small>Portfolio operations</small>
      </span>
    </a>
    <nav aria-label="Primary navigation">
      <p class="drawer-label">Workspace</p>
      <v-list class="navigation-list" bg-color="transparent" nav role="none">
        <v-list-item
          v-for="(item, index) in navigation"
          :key="item.label"
          :class="{ 'navigation-item--active': index === 0 }"
          :href="item.href"
          :prepend-icon="item.icon"
          :title="item.label"
          v-tooltip:right="{ text: `Go to ${item.label}`, id: `navigation-${item.label}-tooltip` }"
          rounded="lg"
          @click="close(permanent)"
        />
      </v-list>
    </nav>
    <template #append>
      <div class="drawer-footer">
        <v-chip color="primary" size="small" variant="tonal">Cycle 18</v-chip>
        <p>Weekly portfolio review</p>
        <span>Friday, 18 September</span>
      </div>
    </template>
  </v-navigation-drawer>
</template>
