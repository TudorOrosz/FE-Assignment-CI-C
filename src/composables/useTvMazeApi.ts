import { ref } from 'vue';
import type { SearchResult, Show } from '../types/tvmaze';

const tvmazeBaseURL = 'https://api.tvmaze.com';

export function useTvMazeApi() {
  const popularShows = ref<Show[]>([]);
  const genreShows = ref<Record<string, Show[]>>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPopularShows() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${tvmazeBaseURL}/shows?page=0`);
      if (!response.ok) {
        throw new Error('Failed to load popular shows');
      }
      const data = (await response.json()) as Show[];
      popularShows.value = data.sort((a, b) => {
        const aValue = a.rating.average ?? 0;
        const bValue = b.rating.average ?? 0;
        return bValue - aValue;
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchShowDetails(id: string | number) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${tvmazeBaseURL}/shows/${id}`);
      if (!response.ok) {
        throw new Error('Failed to load show details');
      }
      return (await response.json()) as Show;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function searchShows(query: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${tvmazeBaseURL}/search/shows?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search shows');
      }
      const data = (await response.json()) as SearchResult[];
      return data.map((entry) => entry.show);
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchMoreShowsByGenre(genre: string, maxPages: number = 10) {
    loading.value = true;
    error.value = null;

    try {
      const shows: Show[] = [];
      for (let page = 1; page < maxPages; page++) {
        const response = await fetch(`${tvmazeBaseURL}/shows?page=${page}`);
        if (!response.ok) break;
        const data = (await response.json()) as Show[];
        if (data.length === 0) break;

        const filtered = data.filter((show) => show.genres.includes(genre));
        shows.push(...filtered);

        if (shows.length >= 30) break;
      }

      genreShows.value[genre] = shows;
      return shows;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  return {
    popularShows,
    genreShows,
    loading,
    error,
    fetchPopularShows,
    fetchShowDetails,
    searchShows,
    fetchMoreShowsByGenre,
  };
}
