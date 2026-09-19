# Meridian

Meridian is a responsive portfolio operations dashboard and the React + MUI version of a side-by-side framework comparison. It uses static local project data.

## Features

- Responsive permanent and temporary navigation
- Persisted light and dark themes
- Accessible native SVG delivery chart and team capacity indicators
- Searchable, filterable, sortable, selectable, and paginated project table
- Comfortable and compact table density modes
- CSV export of all filtered and sorted projects

## Local development

Requires Node.js 24 or newer and npm 12.

```sh
npm ci
npm run dev
```

The development server prints its local URL. Other useful commands:

```sh
npm run format:check
npm run lint
npm test
npm run build
npm run preview
```

## Stack

- React 19 and TypeScript 6
- Vite 8
- MUI 9 with Emotion
- Vitest and Testing Library
- ESLint and Prettier

No API, router, chart library, data-grid package, or state library is used. The delivery chart is native SVG and the data table uses MUI core components.

## Deployment

The production build keeps the `/dashboard-react-mui/` base path and deploys from `main` with GitHub Pages Actions.

<https://natalie-o-perret.github.io/dashboard-react-mui/>
