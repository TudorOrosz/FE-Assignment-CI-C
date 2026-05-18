import { ref } from 'vue';
const tvmazeBase = 'https://api.tvmaze.com';
export function useTvMazeApi() {
    const popularShows = ref([]);
    const loading = ref(false);
    const error = ref(null);
    async function fetchPopularShows() {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(`${tvmazeBase}/shows?page=0`);
            if (!response.ok) {
                throw new Error('Failed to load popular shows');
            }
            const data = (await response.json());
            popularShows.value = data.sort((a, b) => {
                const aValue = a.rating.average ?? 0;
                const bValue = b.rating.average ?? 0;
                return bValue - aValue;
            });
        }
        catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
        }
        finally {
            loading.value = false;
        }
    }
    async function fetchShowDetails(id) {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(`${tvmazeBase}/shows/${id}`);
            if (!response.ok) {
                throw new Error('Failed to load show details');
            }
            return (await response.json());
        }
        catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
            return null;
        }
        finally {
            loading.value = false;
        }
    }
    async function searchShows(query) {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(`${tvmazeBase}/search/shows?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to search shows');
            }
            const data = (await response.json());
            return data.map((entry) => entry.show);
        }
        catch (err) {
            error.value = err instanceof Error ? err.message : String(err);
            return [];
        }
        finally {
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
//# sourceMappingURL=useTvMazeApi.js.map