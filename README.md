# TVMaze Dashboard

A Vue 3 + TypeScript single-page app for browsing TV shows from the TVMaze API.

Users can:
- Browse popular shows grouped by core genres
- Filter shows by a selected genre
- Search by title
- Open a detail view for a selected show

## Tech stack

- Vue 3 with Composition API
- TypeScript
- Vue Router 4
- Vite
- Vitest + Testing Library (unit tests)
- Playwright (end-to-end tests)

## Product behavior

### Dashboard
- Route: `/`
- Initial data source: `GET /shows?page=0`
- Shows are sorted by rating (descending)
- Default dashboard sections: Drama, Comedy, Action, Science-Fiction, Thriller, Romance
- Limit per default section: 5 cards

### Genre filter
- Filter options include an `All` state plus a curated set of genres
- Filtered view limit: up to 30 shows
- If current local data has fewer than 30 shows for a selected genre:
  - Lazy-loads additional pages from TVMaze
  - Page scan limit: up to 10 pages total (starts after page 0)
  - Results are stored per genre in `genreShows` cache

### Search
- Route: `/search?q=<term>`
- Uses TVMaze search endpoint: `GET /search/shows?q=...`
- Search query is URL-based (shareable/back-forward friendly)
- If query is empty, no request is made

### Show details
- Route: `/show/:id`
- Loads full show detail using `GET /shows/:id`
- Displays poster, genres, rating, status, premiered date, summary, and official site link

## Key architectural decisions

### 1) Performance-first dashboard loading
Only page 0 is fetched on initial load to keep first render fast.

Why:
- Better perceived performance for first interaction
- Lower API/network cost for default view

Trade-off:
- Some genres may initially have fewer results until lazy-loading runs

### 2) Lazy-loading with bounded API cost
Genre filtering loads more data on demand, but never scans the full catalog.

Why:
- Balances completeness with responsiveness
- Avoids unbounded loops and slow worst-case requests

Trade-off:
- A very rare genre might still return fewer than 30 results within the page cap

### 3) Separate data stores for clarity
The app keeps:
- `popularShows` for dashboard bootstrap data
- `genreShows` for genre-specific lazy-loaded data

Why:
- Clear ownership of state
- Avoids complex deduplication/merge logic in the base collection

### 4) URL as navigation state
Search route query (`q`) is used as a source of truth for search state.

Why:
- Deep-linkable behavior
- Works naturally with browser back/forward

## Project structure

```
src/
  assets/styles/      # Global baseline styles
  components/         # Reusable UI components
  composables/        # API + reusable state logic
  router/             # Route definitions
  types/              # TypeScript models
  views/              # Route-level screens
tests/
  unit/               # Vitest unit tests
  e2e/                # Playwright e2e tests
```

## Scripts

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run tests (unit + e2e):

```bash
npm run test:ci
```

## Notes and assumptions

- Data comes directly from public TVMaze endpoints
- The app currently prioritizes runtime simplicity over aggressive caching policies
