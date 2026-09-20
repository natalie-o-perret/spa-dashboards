<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

defineProps<{ drawerOpen: boolean; mobile: boolean }>()
defineEmits<{ toggleDrawer: [] }>()

const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'meridianDark')
const themeActionLabel = computed(() => (isDark.value ? 'Use light theme' : 'Use dark theme'))

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'meridianLight' : 'meridianDark'
  try {
    globalThis.localStorage.setItem('meridian-theme', isDark.value ? 'dark' : 'light')
  } catch {
    // Keep the selected theme for this session when storage is unavailable.
  }
}
</script>

<template>
  <v-app-bar class="top-bar" :inert="drawerOpen && mobile" flat height="72">
    <v-app-bar-nav-icon
      v-if="mobile"
      :aria-label="drawerOpen ? 'Close navigation' : 'Open navigation'"
      aria-controls="mobile-navigation"
      :aria-expanded="drawerOpen"
      @click="$emit('toggleDrawer')"
    />
    <div class="top-bar__heading">
      <span>Friday, 18 September</span>
      <strong>Portfolio overview</strong>
    </div>
    <template #append>
      <span class="sync-status"><i aria-hidden="true"></i>Last synced 8 min ago</span>
      <v-btn
        class="theme-toggle"
        :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        :aria-label="themeActionLabel"
        :aria-pressed="isDark"
        :title="themeActionLabel"
        variant="text"
        @click="toggleTheme"
      />
      <v-avatar
        class="account-avatar"
        color="primary"
        size="36"
        role="img"
        aria-label="Signed in as Maya Chen"
      >
        MC
      </v-avatar>
    </template>
  </v-app-bar>
</template>
