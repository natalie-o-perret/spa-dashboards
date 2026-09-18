import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

let savedTheme: string | null = null
try {
  savedTheme = localStorage.getItem('canopy-theme')
} catch {
  // Storage can be disabled while the rest of the app remains usable.
}

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
const defaultTheme =
  savedTheme === 'canopyDark' || savedTheme === 'canopyLight'
    ? savedTheme
    : prefersDark
      ? 'canopyDark'
      : 'canopyLight'

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
      canopyLight: {
        dark: false,
        colors: {
          background: '#f3eee3',
          surface: '#fffaf1',
          primary: '#1d4b3c',
          secondary: '#9daf6f',
          'on-secondary': '#173f34',
          accent: '#ad5b43',
          'on-accent': '#fffaf1',
          success: '#397257',
          warning: '#7c4818',
          error: '#a3473f',
          info: '#476f73',
          'on-background': '#21342d',
          'on-surface': '#21342d',
          'surface-variant': '#e6ddca',
          'on-surface-variant': '#56665f',
        },
      },
      canopyDark: {
        dark: true,
        colors: {
          background: '#101d19',
          surface: '#182923',
          primary: '#a9c89b',
          secondary: '#b8c985',
          'on-secondary': '#173f34',
          accent: '#e28a6c',
          'on-accent': '#3b1f18',
          success: '#85b99b',
          warning: '#e0a25f',
          error: '#e18a80',
          info: '#8fb9bc',
          'on-background': '#f2eddf',
          'on-surface': '#f2eddf',
          'surface-variant': '#2a3b34',
          'on-surface-variant': '#c2cdc4',
        },
      },
    },
  },
})
