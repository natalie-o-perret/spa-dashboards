<script setup lang="ts">
import { computed } from 'vue'

const weeks = [
  { label: 'W31', beds: 19, harvest: 24 },
  { label: 'W32', beds: 20, harvest: 29 },
  { label: 'W33', beds: 22, harvest: 27 },
  { label: 'W34', beds: 23, harvest: 36 },
  { label: 'W35', beds: 25, harvest: 41 },
  { label: 'W36', beds: 26, harvest: 38 },
  { label: 'W37', beds: 27, harvest: 54 },
  { label: 'W38', beds: 28, harvest: 51 },
] as const

const plot = { left: 52, right: 686, top: 22, bottom: 204 }
const harvestTicks = [0, 15, 30, 45, 60]
const step = (plot.right - plot.left) / (weeks.length - 1)

const x = (index: number) => plot.left + index * step
const harvestY = (value: number) => plot.bottom - (value / 60) * (plot.bottom - plot.top)
const bedY = (value: number) => plot.bottom - (value / 32) * (plot.bottom - plot.top)

const linePoints = computed(() =>
  weeks.map((week, index) => `${x(index)},${harvestY(week.harvest)}`).join(' '),
)

const areaPath = computed(
  () =>
    `M ${x(0)} ${plot.bottom} L ${weeks
      .map((week, index) => `${x(index)} ${harvestY(week.harvest)}`)
      .join(' L ')} L ${x(weeks.length - 1)} ${plot.bottom} Z`,
)

const chartDescription = computed(
  () =>
    `Weekly values: ${weeks
      .map(
        (week) => `${week.label}, ${week.beds} active beds and ${week.harvest} kilograms harvested`,
      )
      .join('; ')}.`,
)
</script>

<template>
  <figure class="trend-figure">
    <div class="chart-legend" aria-hidden="true">
      <span><i class="legend-block"></i>Active beds</span>
      <span><i class="legend-line"></i>Harvest kg</span>
    </div>

    <div
      class="chart-scroll"
      role="region"
      aria-label="Scrollable growing and harvest chart"
      tabindex="0"
    >
      <svg
        class="trend-svg"
        viewBox="0 0 720 244"
        role="img"
        aria-labelledby="trend-title trend-description"
      >
        <title id="trend-title">Active growing beds and weekly harvest</title>
        <desc id="trend-description">{{ chartDescription }}</desc>

        <g v-for="tick in harvestTicks" :key="tick">
          <line
            class="chart-grid"
            :x1="plot.left"
            :x2="plot.right"
            :y1="harvestY(tick)"
            :y2="harvestY(tick)"
          />
          <text class="axis-label" x="42" :y="harvestY(tick) + 4" text-anchor="end">
            {{ tick }}
          </text>
        </g>

        <text class="axis-title" x="12" y="17">kg</text>
        <text class="axis-title" x="690" y="17">beds</text>
        <text class="axis-label" x="696" :y="plot.bottom + 4">0</text>
        <text class="axis-label" x="696" :y="plot.top + 4">32</text>

        <g v-for="(week, index) in weeks" :key="week.label">
          <rect
            class="growing-bar"
            :x="x(index) - 14"
            :y="bedY(week.beds)"
            width="28"
            :height="plot.bottom - bedY(week.beds)"
            rx="8"
          />
          <text class="week-label" :x="x(index)" y="228" text-anchor="middle">
            {{ week.label }}
          </text>
        </g>

        <path class="harvest-area" :d="areaPath" />
        <polyline class="harvest-line" :points="linePoints" />
        <circle
          v-for="(week, index) in weeks"
          :key="`${week.label}-harvest`"
          class="harvest-point"
          :cx="x(index)"
          :cy="harvestY(week.harvest)"
          r="5"
        />
      </svg>
    </div>

    <figcaption>
      Eight-week view. The latest harvest eased by 3 kg while growing capacity reached 88%.
    </figcaption>
  </figure>
</template>

<style scoped>
.trend-figure {
  margin: 0;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: flex-end;
  min-height: 24px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.78rem;
  font-weight: 700;
}

.chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.legend-block {
  width: 13px;
  height: 13px;
  border-radius: 4px 4px 4px 1px;
  background: rgb(var(--v-theme-primary));
}

.legend-line {
  width: 18px;
  border-top: 3px solid rgb(var(--v-theme-accent));
}

.chart-scroll {
  overflow-x: auto;
  padding: 4px 2px 8px;
}

.trend-svg {
  display: block;
  width: 100%;
  min-width: 560px;
  height: auto;
}

.chart-grid {
  stroke: rgba(var(--v-theme-on-surface), 0.11);
  stroke-width: 1;
  stroke-dasharray: 4 6;
}

.axis-label,
.axis-title,
.week-label {
  fill: rgb(var(--v-theme-on-surface-variant));
  font-family: inherit;
  font-size: 11px;
  font-weight: 650;
}

.axis-title {
  font-size: 10px;
  text-transform: uppercase;
}

.growing-bar {
  fill: rgb(var(--v-theme-primary));
}

.harvest-area {
  fill: rgba(var(--v-theme-accent), 0.09);
}

.harvest-line {
  fill: none;
  stroke: rgb(var(--v-theme-accent));
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  vector-effect: non-scaling-stroke;
}

.harvest-point {
  fill: rgb(var(--v-theme-surface));
  stroke: rgb(var(--v-theme-accent));
  stroke-width: 3;
  vector-effect: non-scaling-stroke;
}

figcaption {
  margin-top: 4px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.78rem;
}
</style>
