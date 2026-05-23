const BASE_URL = 'https://api.tvmaze.com/shows?page=';

async function fetchPage(page) {
  const response = await fetch(`${BASE_URL}${page}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

async function main() {
  const genres = new Set();
  let page = 0;

  while (true) {
    const shows = await fetchPage(page);
    if (!shows || !Array.isArray(shows) || shows.length === 0) {
      break;
    }

    for (const show of shows) {
      if (Array.isArray(show.genres)) {
        for (const genre of show.genres) {
          genres.add(genre);
        }
      }
    }

    page += 1;
  }

  const sorted = Array.from(genres).sort((a, b) => a.localeCompare(b));

  console.log(`Fetched pages: ${page}`);
  console.log(`Unique genres: ${sorted.length}`);
  console.log('Genres:');
  for (const genre of sorted) {
    console.log(`- ${genre}`);
  }
}

main().catch((error) => {
  console.error('Failed to list genres:', error);
  process.exit(1);
});
