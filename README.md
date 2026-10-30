# SPA Dashboards

Meridian is a portfolio operations dashboard implemented four ways for a
side-by-side frontend framework comparison.

Live comparison: <https://natalie-o-perret.github.io/spa-dashboards/>

- [Angular Material](./angular-material/)
- [React and MUI](./react-mui/)
- [Vue and Vuetify](./vue-vuetify/)
- [Gleam and Lustre](./gleam-lustre/)

Run each app's commands from its directory. The Gleam app consumes
[Meridian UI](https://github.com/natalie-o-perret/gleam-lustre-meridian-ui)
for its reusable components and styles, pinned to a Git commit.

| App              | Development                                  | Checks                                 |
| ---------------- | -------------------------------------------- | -------------------------------------- |
| Angular Material | `cd angular-material && npm ci && npm start` | `npm run check && npm run build:pages` |
| React and MUI    | `cd react-mui && npm ci && npm run dev`      | `npm run check && npm run build:pages` |
| Vue and Vuetify  | `cd vue-vuetify && npm ci && npm run dev`    | `npm run check && npm run build:pages` |
| Gleam and Lustre | `cd gleam-lustre && make dev`                | `make check && make build`             |

All four use static illustrative data and share the same features and content,
while keeping their framework-specific implementation and visual identity.
