<script setup lang="ts">
import { teamCapacity } from './data'
import TrendChart from './TrendChart.vue'
</script>

<template>
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
        <v-card-text class="trend-card-content"><TrendChart /></v-card-text>
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
</template>
