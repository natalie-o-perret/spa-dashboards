# Northstar

A responsive project-delivery dashboard built with Angular and Angular Material. Northstar uses static local data, a native SVG trend chart, and a persisted light or dark theme.

Live site: <https://natalie-o-perret.github.io/dashboard-angular-material/>

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
npm run build
```

Run `npm run format` to apply formatting. To reproduce the GitHub Pages build locally, run:

```bash
npm run build:pages
```

The Pages-ready browser output is written to `dist/northstar/browser/`.
