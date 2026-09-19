<script setup lang="ts">
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
  { label: 'Budget used', value: '68%', detail: '€482k of €710k', icon: 'mdi-wallet-outline' },
  {
    label: 'Team capacity',
    value: '76%',
    detail: '27 contributors',
    icon: 'mdi-account-multiple-outline',
  },
]
</script>

<template>
  <header id="overview" class="page-header">
    <div>
      <p class="eyebrow">Cycle 18 / Weekly review</p>
      <h1>Portfolio overview</h1>
      <p class="page-summary">Track delivery, capacity, and risk across every active project.</p>
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
</template>
