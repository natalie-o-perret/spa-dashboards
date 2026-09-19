# Meridian

The Angular Material version of Meridian, a shared portfolio-operations dashboard used to compare frontend frameworks side by side.

Live site: <https://natalie-o-perret.github.io/dashboard-angular-material/>

## Features

- Responsive permanent navigation and accessible mobile drawer
- Persisted light and dark themes
- Native accessible SVG delivery chart and team-capacity progress
- Material data table with search, status filtering, sorting, selection, pagination, density controls, and CSV export
- Static local data with no router, backend, state library, or chart dependency

## Stack

- Angular 22 with standalone components and strict TypeScript
- Angular Material 22 and SCSS
- Vitest through Angular's unit-test builder
- ESLint with angular-eslint and Prettier

## Local Development

Use Node 24, the current LTS release line, then install dependencies and start the development server:

```bash
npm ci
npm start
```

Open <http://localhost:4200/>.

## Checks

```bash
npm run format:check
npm run lint
npm test
npm run build:pages
```

Run `npm run format` to apply formatting. The Pages-ready browser output is written to `dist/meridian/browser/`.
