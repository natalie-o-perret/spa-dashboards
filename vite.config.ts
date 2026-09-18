import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  base: '/dashboard-vue-vuetify/',
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    server: {
      deps: {
        inline: [/vuetify/],
      },
    },
  },
})
