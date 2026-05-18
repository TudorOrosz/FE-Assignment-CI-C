# TVmaze Dashboard

A compact Vue 3 + TypeScript dashboard for browsing TVMaze shows by genre, searching titles, and viewing show details.

## Why this stack?

- **Vue 3 + Composition API**: good fit for ABN AMRO and clean component structure.
- **TypeScript**: improves maintainability and makes the API contract explicit.
- **Vite**: minimal scaffold and fast dev workflow.
- **Vitest + Testing Library**: unit-test focused, lightweight, and easy to integrate.

## Folder structure

- `src/` — application source
  - `components/` — reusable UI pieces
  - `views/` — route screens
  - `composables/` — API and state composition logic
  - `router/` — Vue Router configuration
  - `types/` — typed TVMaze models
  - `assets/styles/` — global CSS styles

## Running the app

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```
