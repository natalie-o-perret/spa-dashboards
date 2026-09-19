<script setup lang="ts">
const delivery = [
  { week: 'W31', value: 62 },
  { week: 'W32', value: 68 },
  { week: 'W33', value: 66 },
  { week: 'W34', value: 73 },
  { week: 'W35', value: 78 },
  { week: 'W36', value: 81 },
  { week: 'W37', value: 86 },
  { week: 'W38', value: 91 },
] as const

const plot = { left: 48, right: 712, top: 18, bottom: 208 }
const ticks = [50, 75, 100]
const x = (index: number) => plot.left + (index * (plot.right - plot.left)) / (delivery.length - 1)
const y = (value: number) => plot.bottom - ((value - 50) / 50) * (plot.bottom - plot.top)
const linePoints = delivery.map((point, index) => `${x(index)},${y(point.value)}`).join(' ')
const areaPath = `M ${x(0)} ${plot.bottom} L ${delivery
  .map((point, index) => `${x(index)} ${y(point.value)}`)
  .join(' L ')} L ${x(delivery.length - 1)} ${plot.bottom} Z`
const accessibleValues = delivery.map((point) => `${point.week}: ${point.value}%`).join('; ')
</script>

<template>
  <figure class="trend-figure">
    <div class="chart-frame">
      <svg
        class="trend-chart"
        viewBox="0 0 760 250"
        role="img"
        aria-labelledby="delivery-chart-title delivery-chart-description"
      >
        <title id="delivery-chart-title">On-time delivery from week 31 to week 38</title>
        <desc id="delivery-chart-description">{{ accessibleValues }}</desc>
        <defs>
          <linearGradient id="delivery-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgb(var(--v-theme-primary))" stop-opacity="0.3" />
            <stop offset="100%" stop-color="rgb(var(--v-theme-primary))" stop-opacity="0.02" />
          </linearGradient>
        </defs>

        <g v-for="tick in ticks" :key="tick" aria-hidden="true">
          <line class="chart-grid" :x1="plot.left" :x2="plot.right" :y1="y(tick)" :y2="y(tick)" />
          <text class="axis-label" x="38" :y="y(tick) + 4" text-anchor="end">{{ tick }}%</text>
        </g>

        <path class="delivery-area" :d="areaPath" aria-hidden="true" />
        <polyline class="delivery-line" :points="linePoints" aria-hidden="true" />

        <g v-for="(point, index) in delivery" :key="point.week" aria-hidden="true">
          <circle
            class="delivery-point"
            :class="{ 'delivery-point--latest': index === delivery.length - 1 }"
            :cx="x(index)"
            :cy="y(point.value)"
            :r="index === delivery.length - 1 ? 6 : 4"
          />
          <text class="week-label" :x="x(index)" y="235" text-anchor="middle">
            {{ point.week }}
          </text>
        </g>
      </svg>
    </div>
    <figcaption class="sr-only">{{ accessibleValues }}</figcaption>
  </figure>
</template>

<style scoped src="../styles/trend-chart.css"></style>
