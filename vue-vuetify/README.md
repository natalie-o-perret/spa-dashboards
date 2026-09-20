# Meridian

Meridian is a static portfolio operations dashboard and the Vue + Vuetify entry
in a side-by-side Angular Material, React MUI, and Vue Vuetify comparison.

Live site: <https://natalie-o-perret.github.io/dashboard-vue-vuetify/>

## Stack

- Vue 3 with the Composition API and TypeScript
- Vuetify 4
- Vite 8
- Effect 3 for runtime schemas and domain types
- Vitest and Vue Test Utils
- ESLint and Prettier

The responsive dashboard includes portfolio metrics, an accessible native SVG
delivery chart, team capacity, and a searchable project table with status
filtering, sorting, page selection, pagination, density controls, and CSV export.
All data is local and illustrative. The app has no API, router, chart dependency,
or client-side state library.

## Architecture

The app uses feature-first vertical slices. `shell` owns navigation and theming,
while `portfolio` and `projects` own their data, domain rules, UI, and tests.
Project fixtures are decoded into branded domain values with Effect Schema.

## Local development

Requires Node.js 20.19, or any release from 22.12 onward.

```sh
npm ci
npm run dev
```

Vite prints the local development URL. The production site uses the
`/dashboard-vue-vuetify/` base path.

## Checks

```sh
npm run check
npm run build:pages
```

Use `npm run format` to apply Prettier formatting. Production output is written
to `dist/`.
