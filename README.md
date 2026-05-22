# TVmaze Dashboard

A compact Vue 3 + TypeScript dashboard for browsing TVMaze shows by genre, searching titles, and viewing show details.

## Why this stack?

- **Vue 3**: chosen FE framework within the bank
  - Composition API: better logic composition, reusability, and TypeScript support
- **TypeScript**: improves maintainability and predictability; and is also the FE language used within the bank
- **Vite**: minimal scaffold and fast dev workflow.
- **Playwright**: e2e testing

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
