# Meridian dashboards

Meridian is a portfolio operations dashboard implemented three ways for a
side-by-side frontend framework comparison.

- [Angular Material](./angular-material/)
- [React and MUI](./react-mui/)
- [Vue and Vuetify](./vue-vuetify/)

Each app is self-contained. Run its commands from the corresponding directory.

| App | Development | Checks |
| --- | --- | --- |
| Angular Material | `cd angular-material && npm ci && npm start` | `npm run check && npm run build:pages` |
| React and MUI | `cd react-mui && npm ci && npm run dev` | `npm run check && npm run build:pages` |
| Vue and Vuetify | `cd vue-vuetify && npm ci && npm run dev` | `npm run check && npm run build:pages` |

All three use static illustrative data and share the same features and content,
while keeping their framework-specific implementation and visual identity.
