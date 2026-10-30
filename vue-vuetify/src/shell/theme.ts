import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

let defaultTheme = 'system'
try {
  const saved = localStorage.getItem('meridian-theme')
  if (saved === 'light' || saved === 'dark' || saved === 'system') defaultTheme = saved
} catch {
  // Storage can be disabled while the rest of the app remains usable.
}

export default createVuetify({
  defaults: {
    VTooltip: {
      interactive: true,
      eager: false,
    },
    VBtn: {
      rounded: 'lg',
    },
    VCard: {
      elevation: 0,
    },
    VTextField: {
      color: 'primary',
    },
    VSelect: {
      color: 'primary',
    },
  },
  theme: {
    defaultTheme,
    themes: {
      light: {
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
      dark: {
        dark: true,
        colors: {
          background: '#0d0e10',
          surface: '#18191c',
          primary: '#81c784',
          'on-primary': '#101113',
          secondary: '#b5b8c0',
          'on-secondary': '#18191c',
          success: '#71d49a',
          warning: '#f4bd62',
          error: '#ff8c8c',
          info: '#9ecaff',
          'on-background': '#f3f4f6',
          'on-surface': '#f3f4f6',
          'surface-variant': '#202125',
          'on-surface-variant': '#b5b8c0',
          'outline-variant': '#34363c',
          subtle: '#202125',
          divider: '#34363c',
          shadow: '#000000',
        },
      },
    },
  },
})
