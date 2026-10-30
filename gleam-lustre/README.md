# Meridian

The Gleam + Lustre version of Meridian. It uses the same illustrative data and
features as the other dashboards, with native HTML controls and a violet theme.

## Features

- Responsive navigation and persisted light and dark themes
- Self-hosted Manrope typography, SVG icons, and reduced-motion-aware transitions
- Portfolio metrics, an accessible SVG delivery chart, and team capacity
- Search across project fields, status filtering, and three-state column sorting
- Page selection, pagination, and comfortable and compact table density
- CSV export of all filtered and sorted projects, not just the current page
- Typed project fixtures and Gleeunit tests for the table and application state

There is no backend, router, chart library, or CSS framework.
Small JavaScript functions handle browser storage, downloads, and locale formatting.

## Local development

Requires Gleam 1.19.2, Erlang/OTP 29, Rebar3, Node.js 24.15+ (or 26+), and Make.
Lustre's dev tools download their own verified Bun binary when needed.

```sh
make dev
```

Open <http://localhost:1234/>. Gleam downloads the locked Hex dependencies
automatically. Source and asset changes reload the page.

## Checks and production build

```sh
make check
make build
```

Checks cover Gleam formatting, compilation, Gleeunit tests, and JavaScript bridge
tests. Production output is written to `dist/`. The build copies a small HTML entry
with relative asset URLs so it works under `/spa-dashboards/gleam-lustre/` on Pages.

## Structure

`shell` owns navigation and layout. `features/portfolio` owns metrics and charts.
`features/projects` owns the typed fixtures, pure table state, CSV formatting, and
table view. `meridian.gleam` connects them through Lustre's model/update/view loop.

## Visual assets

The Manrope variable font comes from Fontsource 5.3.0 under the SIL Open Font
License. Icons come from Lucide (ISC/MIT), with the Simple Icons GitHub mark
(CC0). Assets and their licence notices are served locally, with no font or icon CDN.

Custom select menus use `appearance: base-select`. Browsers without support keep
their accessible native menus.

Live site after deployment:
<https://natalie-o-perret.github.io/spa-dashboards/gleam-lustre/>
