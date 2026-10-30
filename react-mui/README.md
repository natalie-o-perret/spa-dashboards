# Meridian

Meridian is a responsive portfolio operations dashboard and the React + MUI version of a side-by-side framework comparison. It uses static local project data.

## Features

- Responsive permanent and temporary navigation
- Persisted light and dark themes
- Accessible native SVG delivery chart and team capacity indicators
- Searchable, filterable, sortable, selectable, and paginated project table
- Comfortable and compact table density modes
- CSV export of all filtered and sorted projects
- Effect Schema validation for branded project data at the fixture boundary

## Local development

Requires Node.js 24.15+ (or 26+) and npm 12.2.1.

```sh
npm ci
npm run dev
```

The development server prints its local URL. Other useful commands:

```sh
npm run check
npm run build:pages
npm run preview
```

## Stack

- React 19 and TypeScript 6
- Vite 8
- MUI 9 with Emotion
- Effect 4 for runtime schemas and domain types
- Vitest and Testing Library
- ESLint and Prettier

No API, router, chart library, data-grid package, or state library is used. The delivery chart is native SVG and the data table uses MUI core components.

## Architecture

The app uses feature-first vertical slices. `shell` owns navigation and theming, while `portfolio` and `projects` own their data, domain rules, UI, and tests.

## Deployment

The production build uses the `/spa-dashboards/react-mui/` base path and deploys from `main` with GitHub Pages Actions.

<https://natalie-o-perret.github.io/spa-dashboards/react-mui/>
