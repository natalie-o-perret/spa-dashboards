<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import ProjectTable from './components/ProjectTable.vue'
import TrendChart from './components/TrendChart.vue'

const navigation = [
  { label: 'Overview', icon: 'mdi-view-dashboard-outline', href: '#overview' },
  { label: 'Analytics', icon: 'mdi-chart-line', href: '#analytics' },
  { label: 'Projects', icon: 'mdi-briefcase-outline', href: '#projects' },
  { label: 'Team', icon: 'mdi-account-group-outline', href: '#team' },
]

const metrics = [
  {
    label: 'Active projects',
    value: '15',
    detail: '3 due this month',
    icon: 'mdi-briefcase-outline',
  },
  {
    label: 'On-time delivery',
    value: '91%',
    detail: 'Up 4 points',
    icon: 'mdi-check-decagram-outline',
  },
  {
    label: 'Budget used',
    value: '68%',
    detail: '€482k of €710k',
    icon: 'mdi-wallet-outline',
  },
  {
    label: 'Team capacity',
    value: '76%',
    detail: '27 contributors',
    icon: 'mdi-account-multiple-outline',
  },
]

const teamCapacity = [
  { name: 'Design', value: 82, people: 6 },
  { name: 'Engineering', value: 76, people: 12 },
  { name: 'Research', value: 64, people: 4 },
  { name: 'Content', value: 58, people: 5 },
]

const { mdAndUp } = useDisplay()
const theme = useTheme()
const drawer = ref(false)

watch(mdAndUp, (wide) => (drawer.value = wide), { immediate: true })
watch(drawer, async (open, wasOpen) => {
  if (mdAndUp.value) return

  await nextTick()
  if (open) {
    focusElement('#mobile-navigation .drawer-close')
  } else if (wasOpen) {
    focusElement('button[aria-controls="mobile-navigation"]')
  }
})

const isDark = computed(() => theme.global.name.value === 'meridianDark')
const themeActionLabel = computed(() => (isDark.value ? 'Use light theme' : 'Use dark theme'))

function toggleTheme() {
  const nextTheme = isDark.value ? 'meridianLight' : 'meridianDark'
  theme.global.name.value = nextTheme
  try {
    globalThis.localStorage.setItem('meridian-theme', isDark.value ? 'dark' : 'light')
  } catch {
    // Keep the selected theme for this session when storage is unavailable.
  }
}

function closeMobileNavigation() {
  if (!mdAndUp.value) drawer.value = false
}

function focusElement(selector: string) {
  const element = globalThis.document.querySelector(selector)
  if (element && 'focus' in element && typeof element.focus === 'function') element.focus()
}
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main-content">Skip to dashboard content</a>

    <v-navigation-drawer
      id="mobile-navigation"
      v-model="drawer"
      class="meridian-drawer"
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      :capture-focus="!mdAndUp"
      :retain-focus="!mdAndUp"
      width="252"
      tag="aside"
      aria-label="Portfolio navigation"
      @keydown.esc.stop="drawer = false"
    >
      <v-btn
        v-if="!mdAndUp"
        class="drawer-close"
        icon="mdi-close"
        aria-label="Close navigation"
        variant="text"
        @click="drawer = false"
      />

      <a class="brand-lockup" href="#overview" @click="closeMobileNavigation">
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
            rounded="lg"
            @click="closeMobileNavigation"
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

    <v-app-bar class="top-bar" :inert="drawer && !mdAndUp" flat height="72">
      <v-app-bar-nav-icon
        v-if="!mdAndUp"
        :aria-label="drawer ? 'Close navigation' : 'Open navigation'"
        aria-controls="mobile-navigation"
        :aria-expanded="drawer"
        @click="drawer = !drawer"
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

    <v-main id="main-content" :inert="drawer && !mdAndUp" tabindex="-1">
      <v-container class="dashboard-container" fluid>
        <header id="overview" class="page-header">
          <div>
            <p class="eyebrow">Cycle 18 / Weekly review</p>
            <h1>Portfolio overview</h1>
            <p class="page-summary">
              Track delivery, capacity, and risk across every active project.
            </p>
          </div>
          <v-chip
            class="health-chip"
            color="primary"
            prepend-icon="mdi-heart-pulse"
            size="large"
            variant="tonal"
          >
            15 active / 3 need attention
          </v-chip>
        </header>

        <section class="metrics-section" aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" class="sr-only">Portfolio summary</h2>
          <v-row>
            <v-col v-for="metric in metrics" :key="metric.label" cols="12" sm="6" lg="3">
              <v-card class="metric-card" height="100%" tag="article">
                <v-card-text>
                  <div class="metric-card__heading">
                    <span>{{ metric.label }}</span>
                    <v-icon :icon="metric.icon" color="primary" aria-hidden="true" />
                  </div>
                  <strong>{{ metric.value }}</strong>
                  <p>{{ metric.detail }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <v-row id="analytics" class="analytics-row">
          <v-col cols="12" lg="8">
            <v-card class="panel-card" height="100%">
              <v-card-item>
                <div class="panel-heading">
                  <div>
                    <p class="section-label">Analytics</p>
                    <h2>Delivery trend</h2>
                  </div>
                  <div class="panel-stat">
                    <strong>91%</strong>
                    <span>On-time delivery</span>
                  </div>
                </div>
              </v-card-item>
              <v-card-text class="trend-card-content">
                <TrendChart />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card id="team" class="panel-card capacity-card" height="100%">
              <v-card-item>
                <div class="panel-heading">
                  <div>
                    <p class="section-label">Current allocation</p>
                    <h2 id="team-heading">Team capacity</h2>
                  </div>
                  <v-icon icon="mdi-account-group-outline" color="primary" aria-hidden="true" />
                </div>
              </v-card-item>
              <v-card-text>
                <ul class="capacity-list" aria-labelledby="team-heading">
                  <li v-for="team in teamCapacity" :key="team.name">
                    <div class="capacity-label">
                      <strong>{{ team.name }}</strong>
                      <span>{{ team.value }}% / {{ team.people }} people</span>
                    </div>
                    <v-progress-linear
                      :aria-label="`${team.name} capacity: ${team.value}%, ${team.people} people`"
                      :model-value="team.value"
                      color="primary"
                      bg-opacity="0.12"
                      height="8"
                      rounded
                    />
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <section class="projects-section" aria-label="Portfolio projects">
          <ProjectTable />
        </section>

        <footer class="dashboard-footer">
          <span>Meridian / Portfolio operations</span>
          <span>Static demo data / Updated 18 September 2026</span>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
