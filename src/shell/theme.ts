import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

let savedTheme: string | null = null
try {
  savedTheme = localStorage.getItem('meridian-theme')
} catch {
  // Storage can be disabled while the rest of the app remains usable.
}

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
const defaultTheme =
  savedTheme === 'dark'
    ? 'meridianDark'
    : savedTheme === 'light'
      ? 'meridianLight'
      : prefersDark
        ? 'meridianDark'
        : 'meridianLight'

export default createVuetify({
  defaults: {
    VBtn: {
      rounded: 'lg',
    },
    VCard: {
      elevation: 0,
    },
  },
  theme: {
    defaultTheme,
    themes: {
      meridianLight: {
        dark: false,
        colors: {
          background: '#f5f7fa',
          surface: '#ffffff',
          primary: '#2e7d32',
          'on-primary': '#ffffff',
          secondary: '#637083',
          'on-secondary': '#ffffff',
          success: '#17834f',
          warning: '#a85a0a',
          error: '#c33b3b',
          info: '#32658a',
          'on-background': '#172033',
          'on-surface': '#172033',
          'surface-variant': '#f8f9fb',
          'on-surface-variant': '#637083',
          'outline-variant': '#e5e8ed',
          subtle: '#f8f9fb',
          divider: '#e5e8ed',
          shadow: '#172033',
        },
      },
      meridianDark: {
        dark: true,
        colors: {
          background: '#0f141d',
          surface: '#171e2a',
          primary: '#81c784',
          'on-primary': '#102512',
          secondary: '#aeb8c8',
          'on-secondary': '#171e2a',
          success: '#71d49a',
          warning: '#f4bd62',
          error: '#ff8c8c',
          info: '#9ecaff',
          'on-background': '#f2f5fa',
          'on-surface': '#f2f5fa',
          'surface-variant': '#1b2432',
          'on-surface-variant': '#aeb8c8',
          'outline-variant': '#303845',
          subtle: '#1b2432',
          divider: '#303845',
          shadow: '#000000',
        },
      },
    },
  },
})
