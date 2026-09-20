<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import DashboardDrawer from './DashboardDrawer.vue'
import DashboardTopBar from './DashboardTopBar.vue'

const { mdAndUp } = useDisplay()
const drawer = ref(false)

watch(mdAndUp, (wide) => (drawer.value = wide), { immediate: true })
watch(drawer, async (open, wasOpen) => {
  if (mdAndUp.value) return
  await nextTick()
  const selector = open
    ? '#mobile-navigation .drawer-close'
    : wasOpen
      ? 'button[aria-controls="mobile-navigation"]'
      : ''
  const element = selector ? globalThis.document.querySelector(selector) : null
  if (element && 'focus' in element && typeof element.focus === 'function') element.focus()
})
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main-content">Skip to dashboard content</a>
    <DashboardDrawer v-model="drawer" :permanent="mdAndUp" />
    <DashboardTopBar :drawer-open="drawer" :mobile="!mdAndUp" @toggle-drawer="drawer = !drawer" />
    <v-main id="main-content" :inert="drawer && !mdAndUp" tabindex="-1">
      <v-container class="dashboard-container" fluid>
        <slot />
        <footer class="dashboard-footer">
          <span>Meridian / Portfolio operations</span>
          <span>Static demo data / Updated 18 September 2026</span>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
