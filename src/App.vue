<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import TaskList from './components/TaskList.vue'
import TrendChart from './components/TrendChart.vue'

const navigation = [
  { label: 'Overview', icon: 'mdi-view-dashboard-outline', href: '#overview' },
  { label: 'Garden zones', icon: 'mdi-map-marker-radius-outline', href: '#zones' },
  { label: 'Tasks', icon: 'mdi-format-list-checks', href: '#tasks' },
  { label: 'Community', icon: 'mdi-account-multiple-outline', href: '#community' },
]

const metrics = [
  {
    label: 'Growing beds',
    value: '28',
    detail: 'of 32 active',
    note: '4 planted this week',
    icon: 'mdi-sprout-outline',
    color: 'secondary',
    progress: 88,
  },
  {
    label: 'Harvest this week',
    value: '146 kg',
    detail: '12% over plan',
    note: '51 kg picked today',
    icon: 'mdi-basket-outline',
    color: 'accent',
    progress: 73,
  },
  {
    label: 'Volunteer time',
    value: '84 h',
    detail: '18 people',
    note: 'Next shift Saturday',
    icon: 'mdi-account-group-outline',
    color: 'info',
    progress: 75,
  },
  {
    label: 'Water reserve',
    value: '74%',
    detail: '5.2 days left',
    note: 'Up after overnight rain',
    icon: 'mdi-water-outline',
    color: 'primary',
    progress: 74,
  },
]

const zones = [
  {
    name: 'Orchard edge',
    crop: 'Apples / herbs',
    status: 'Thriving',
    color: 'success',
    moisture: 68,
  },
  {
    name: 'Rooftop beds',
    crop: 'Tomatoes / beans',
    status: 'Needs water',
    color: 'warning',
    moisture: 31,
  },
  {
    name: 'Pollinator walk',
    crop: 'Native flowers',
    status: 'Steady',
    color: 'info',
    moisture: 57,
  },
  {
    name: 'Greenhouse',
    crop: 'Winter leaves',
    status: 'Ready to sow',
    color: 'primary',
    moisture: 62,
  },
]

const volunteers = [
  { initials: 'AK', name: 'Amara K.', role: 'Harvest lead', color: 'secondary' },
  { initials: 'JM', name: 'Jules M.', role: 'Water team', color: 'info' },
  { initials: 'PS', name: 'Priya S.', role: 'Tool steward', color: 'accent' },
]

const activity = [
  {
    initials: 'SJ',
    text: 'Sam logged 18 kg of tomatoes',
    time: '22 min ago',
    datetime: '2026-09-18T08:38:00',
  },
  {
    initials: 'MO',
    text: 'Mina flagged the rooftop beds',
    time: '1 h ago',
    datetime: '2026-09-18T08:00:00',
  },
  {
    initials: 'LR',
    text: 'Lee added 3 new volunteers',
    time: 'Yesterday',
    datetime: '2026-09-17',
  },
]

const { lgAndUp } = useDisplay()
const theme = useTheme()
const drawer = ref(false)

watch(lgAndUp, (wide) => (drawer.value = wide), { immediate: true })

const isDark = computed(() => theme.global.name.value === 'canopyDark')
const themeActionLabel = computed(() => (isDark.value ? 'Use light theme' : 'Use dark theme'))

function toggleTheme() {
  const nextTheme = isDark.value ? 'canopyLight' : 'canopyDark'
  theme.global.name.value = nextTheme
  try {
    globalThis.localStorage.setItem('canopy-theme', nextTheme)
  } catch {
    // Keep the selected theme for this session when storage is unavailable.
  }
}

function closeMobileNavigation() {
  if (!lgAndUp.value) drawer.value = false
}
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main-content">Skip to dashboard content</a>

    <v-navigation-drawer
      v-model="drawer"
      class="canopy-drawer"
      :permanent="lgAndUp"
      :temporary="!lgAndUp"
      :capture-focus="!lgAndUp"
      :retain-focus="!lgAndUp"
      id="mobile-navigation"
      tag="aside"
      aria-label="Garden navigation"
      width="272"
      @keydown.esc="drawer = false"
    >
      <v-btn
        v-if="!lgAndUp"
        class="drawer-close"
        icon="mdi-close"
        aria-label="Close navigation"
        variant="text"
        @click="drawer = false"
      />

      <div class="brand-lockup">
        <span class="brand-mark" aria-hidden="true"><v-icon icon="mdi-leaf" /></span>
        <div>
          <strong>Canopy</strong>
          <span>Garden operations</span>
        </div>
      </div>

      <nav aria-label="Primary navigation">
        <p class="drawer-label">Workspace</p>
        <v-list class="navigation-list" bg-color="transparent" nav role="none">
          <v-list-item
            v-for="(item, index) in navigation"
            :key="item.label"
            :active="index === 0"
            :href="item.href"
            :prepend-icon="item.icon"
            :title="item.label"
            rounded="lg"
            @click="closeMobileNavigation"
          />
        </v-list>
      </nav>

      <template #append>
        <div class="drawer-note">
          <div class="drawer-note__icon" aria-hidden="true">
            <v-icon icon="mdi-weather-pouring" />
          </div>
          <div>
            <span>Overnight rainfall</span>
            <strong>6 mm collected</strong>
            <small>Last updated 08:45</small>
          </div>
        </div>
        <p class="garden-location">
          <v-icon icon="mdi-map-marker-outline" size="16" aria-hidden="true" />
          Eastbank Community Garden
        </p>
      </template>
    </v-navigation-drawer>

    <v-app-bar class="top-bar" :inert="drawer && !lgAndUp" flat height="76">
      <v-app-bar-nav-icon
        v-if="!lgAndUp"
        :aria-label="drawer ? 'Close navigation' : 'Open navigation'"
        aria-controls="mobile-navigation"
        :aria-expanded="drawer"
        @click="drawer = !drawer"
      />
      <div class="top-bar__title">
        <span>Friday, 18 September</span>
        <strong>Garden overview</strong>
      </div>

      <template #append>
        <div
          class="weather-brief"
          role="img"
          aria-label="Current weather: 18 degrees Celsius and partly cloudy"
        >
          <v-icon icon="mdi-weather-partly-cloudy" color="warning" aria-hidden="true" />
          <div>
            <strong>18 C</strong>
            <span>Partly cloudy</span>
          </div>
        </div>

        <v-btn
          class="theme-toggle"
          :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          :aria-label="themeActionLabel"
          :aria-pressed="isDark"
          :title="themeActionLabel"
          variant="tonal"
          @click="toggleTheme"
        />
      </template>
    </v-app-bar>

    <v-main id="main-content" :inert="drawer && !lgAndUp">
      <v-container class="dashboard-container" fluid>
        <section id="overview" class="hero-panel" aria-labelledby="overview-heading">
          <div class="hero-copy">
            <p class="eyebrow">Week 38 / Early autumn</p>
            <h1 id="overview-heading">The garden is holding steady.</h1>
            <p>
              Overnight rain helped most beds. Focus today's crew on the rooftop planters and the
              afternoon market harvest.
            </p>
            <div class="hero-tags" aria-label="Today's key conditions">
              <v-chip color="success" prepend-icon="mdi-check-circle-outline" variant="tonal">
                3 zones on track
              </v-chip>
              <v-chip color="warning" prepend-icon="mdi-water-alert-outline" variant="tonal">
                1 watering alert
              </v-chip>
            </div>
          </div>

          <aside class="season-note" aria-label="Season note">
            <div class="season-note__top">
              <span>Season note</span>
              <v-icon icon="mdi-sprout" aria-hidden="true" />
            </div>
            <strong>14 days</strong>
            <p>until the winter planting window</p>
            <div class="season-rule"><span style="width: 64%"></span></div>
          </aside>
        </section>

        <section class="metrics-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading" class="sr-only">Garden summary</h2>
          <v-row>
            <v-col v-for="metric in metrics" :key="metric.label" cols="12" sm="6" lg="3">
              <v-card class="metric-card" height="100%">
                <v-card-text>
                  <div class="metric-card__top">
                    <span class="metric-icon" :class="`metric-icon--${metric.color}`">
                      <v-icon :icon="metric.icon" aria-hidden="true" />
                    </span>
                    <span class="metric-note">{{ metric.note }}</span>
                  </div>
                  <p>{{ metric.label }}</p>
                  <div class="metric-value">
                    <strong>{{ metric.value }}</strong>
                    <span>{{ metric.detail }}</span>
                  </div>
                  <v-progress-linear
                    :aria-label="`${metric.label}: ${metric.progress}%`"
                    :color="metric.color"
                    :model-value="metric.progress"
                    bg-opacity="0.12"
                    height="6"
                    rounded
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <v-row class="dashboard-row">
          <v-col cols="12" lg="8">
            <v-card class="panel-card" height="100%">
              <v-card-item>
                <div class="panel-heading">
                  <div>
                    <p class="eyebrow">Yield rhythm</p>
                    <h2>Growing and harvest trend</h2>
                  </div>
                  <div class="panel-stat">
                    <strong>286 kg</strong>
                    <span
                      ><v-icon icon="mdi-arrow-up" size="14" aria-hidden="true" />12% this
                      month</span
                    >
                  </div>
                </div>
              </v-card-item>
              <v-card-text>
                <TrendChart />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col id="zones" cols="12" lg="4">
            <v-card class="panel-card zone-card" height="100%">
              <v-card-item>
                <div class="panel-heading">
                  <div>
                    <p class="eyebrow">Live conditions</p>
                    <h2 id="zones-heading">Garden zones</h2>
                  </div>
                  <v-chip color="warning" size="small" variant="tonal">1 alert</v-chip>
                </div>
              </v-card-item>
              <v-card-text>
                <ul class="zone-list" aria-labelledby="zones-heading">
                  <li v-for="zone in zones" :key="zone.name">
                    <div class="zone-title">
                      <div>
                        <strong>{{ zone.name }}</strong>
                        <span>{{ zone.crop }}</span>
                      </div>
                      <v-chip :color="zone.color" size="x-small" variant="tonal">
                        {{ zone.status }}
                      </v-chip>
                    </div>
                    <div class="moisture-label">
                      <span>Soil moisture</span>
                      <strong>{{ zone.moisture }}%</strong>
                    </div>
                    <v-progress-linear
                      :aria-label="`${zone.name} soil moisture: ${zone.moisture}%`"
                      :color="zone.color"
                      :model-value="zone.moisture"
                      bg-opacity="0.12"
                      height="6"
                      rounded
                    />
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="dashboard-row">
          <v-col id="tasks" cols="12" lg="8">
            <TaskList />
          </v-col>

          <v-col id="community" cols="12" lg="4">
            <v-card class="panel-card community-card" height="100%">
              <v-card-item>
                <div class="panel-heading">
                  <div>
                    <p class="eyebrow">People power</p>
                    <h2 id="community-heading">Community crew</h2>
                  </div>
                  <v-icon icon="mdi-hand-heart-outline" color="accent" aria-hidden="true" />
                </div>
              </v-card-item>
              <v-card-text>
                <section class="next-shift" aria-labelledby="next-shift-heading">
                  <p>Next open session</p>
                  <h3 id="next-shift-heading">Saturday, 09:00-12:00</h3>
                  <div class="shift-capacity">
                    <span>18 of 24 places filled</span>
                    <strong>75%</strong>
                  </div>
                  <v-progress-linear
                    aria-label="Saturday session is 75% full"
                    color="secondary"
                    :model-value="75"
                    bg-opacity="0.16"
                    height="7"
                    rounded
                  />
                </section>

                <ul class="volunteer-list" aria-label="Saturday session leads">
                  <li v-for="volunteer in volunteers" :key="volunteer.name">
                    <v-avatar :color="volunteer.color" size="34">
                      <span>{{ volunteer.initials }}</span>
                    </v-avatar>
                    <div class="volunteer-copy">
                      <strong>{{ volunteer.name }}</strong>
                      <span>{{ volunteer.role }}</span>
                    </div>
                  </li>
                </ul>

                <v-divider />

                <section class="activity-section" aria-labelledby="activity-heading">
                  <h3 id="activity-heading">Recent activity</h3>
                  <ul class="activity-list">
                    <li v-for="item in activity" :key="item.text">
                      <span class="activity-avatar" aria-hidden="true">{{ item.initials }}</span>
                      <div>
                        <p>{{ item.text }}</p>
                        <time :datetime="item.datetime">{{ item.time }}</time>
                      </div>
                    </li>
                  </ul>
                </section>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <footer class="dashboard-footer">
          <span>Canopy / Eastbank Community Garden</span>
          <span>Static demo data / Updated 18 September 2026</span>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
