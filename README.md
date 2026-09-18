# Mosaic

Mosaic is a responsive editorial and audience dashboard for an independent publishing studio. It is a static React demo built with local sample data.

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

No API, router, chart library, or state library is used. The audience chart is native SVG and all dashboard data is local.

## Deployment

The production build uses the `/dashboard-react-mui/` base path and deploys from `main` with GitHub Pages Actions.

<https://natalie-o-perret.github.io/dashboard-react-mui/>
