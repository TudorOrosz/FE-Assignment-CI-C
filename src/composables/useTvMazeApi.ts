import { ref } from 'vue';
import type { Show } from '../types/tvmaze';

const tvmazeBaseURL = 'https://api.tvmaze.com';

export function useTvMazeApi() {
  const popularShows = ref<Show[]>([]);
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
      const data = (await response.json()) as Array<{ show: Show }>;
      return data.map((entry) => entry.show);
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  return {
    popularShows,
    loading,
    error,
    fetchPopularShows,
    fetchShowDetails,
    searchShows,
  };
}
