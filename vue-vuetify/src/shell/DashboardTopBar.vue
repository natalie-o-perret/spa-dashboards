<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

defineProps<{ drawerOpen: boolean; mobile: boolean }>()
defineEmits<{ toggleDrawer: [] }>()

const theme = useTheme()
const choices = [
  { value: 'light', label: 'Light', icon: 'mdi-white-balance-sunny' },
  { value: 'dark', label: 'Dark', icon: 'mdi-weather-night' },
  { value: 'system', label: 'System', icon: 'mdi-monitor' },
] as const
const preference = computed(() =>
  theme.isSystem.value ? 'system' : theme.current.value.dark ? 'dark' : 'light',
)
const current = computed(() => choices.find((choice) => choice.value === preference.value)!)
const next = computed(() => choices[(choices.indexOf(current.value) + 1) % choices.length]!)
const themeActionLabel = computed(
  () => `Theme: ${current.value.label}. Switch to ${next.value.label.toLowerCase()} theme`,
)

function cycleTheme() {
  const mode = next.value.value
  void theme.change(mode)
  try {
    globalThis.localStorage.setItem('meridian-theme', mode)
  } catch {
    // Keep the selected theme for this session when storage is unavailable.
  }
}
</script>

<template>
  <v-app-bar class="top-bar" :inert="drawerOpen && mobile" flat height="72">
    <v-app-bar-nav-icon
      v-if="mobile"
      v-tooltip:bottom="{ text: 'Open navigation', id: 'open-navigation-tooltip' }"
      :aria-label="drawerOpen ? 'Close navigation' : 'Open navigation'"
      aria-controls="mobile-navigation"
      :aria-expanded="drawerOpen"
      @click="$emit('toggleDrawer')"
    />
    <v-btn
      class="comparison-link"
      v-tooltip:bottom="{ text: 'Compare all four dashboards', id: 'all-dashboards-tooltip' }"
      href="../"
      prepend-icon="mdi-arrow-left"
      size="small"
      variant="text"
      >All dashboards</v-btn
    >
    <v-chip
      class="framework-badge"
      v-tooltip:bottom="{ text: 'Built with Vue and Vuetify', id: 'framework-tooltip' }"
      prepend-icon="mdi-vuejs"
      color="primary"
      size="small"
      variant="tonal"
      >Vue + Vuetify</v-chip
    >
    <template #append>
      <span class="sync-status"><i aria-hidden="true"></i>Last synced 8 min ago</span>
      <v-btn
        href="https://github.com/natalie-o-perret/spa-dashboards/tree/main/vue-vuetify"
        target="_blank"
        rel="noreferrer"
        icon="mdi-github"
        aria-label="View Vue Vuetify source on GitHub"
        v-tooltip:bottom="{ text: 'View source on GitHub', id: 'source-tooltip' }"
        variant="text"
      />
      <v-btn
        class="theme-toggle"
        :icon="current.icon"
        :aria-label="themeActionLabel"
        v-tooltip:bottom="{ text: themeActionLabel, id: 'theme-tooltip' }"
        variant="text"
        @click="cycleTheme"
      />
      <v-avatar
        class="account-avatar"
        color="primary"
        size="36"
        role="img"
        aria-label="Signed in as Maya Chen"
        v-tooltip:bottom="{ text: 'Demo workspace: Maya Chen', id: 'workspace-tooltip' }"
      >
        MC
      </v-avatar>
    </template>
  </v-app-bar>
</template>
