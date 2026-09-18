# Canopy

Canopy is a static community garden and urban ecology operations dashboard.
It presents growing conditions, harvest trends, garden-zone health, upcoming
work, and volunteer activity in a responsive Vue interface.

Live site: <https://natalie-o-perret.github.io/dashboard-vue-vuetify/>

## Stack

- Vue 3 with the Composition API and TypeScript
- Vuetify 4
- Vite 8
- Vitest and Vue Test Utils
- ESLint and Prettier

All dashboard data is local and illustrative. The app has no API, router, or
client-side state library.

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
npm run format:check
npm run lint
npm run test
npm run typecheck
npm run build
```

Use `npm run format` to apply Prettier formatting. Production output is written
to `dist/`.
