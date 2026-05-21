import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export function useSearch(initialQuery = '') {
  const query = ref(initialQuery);
  const router = useRouter();

  function submitSearch() {
    if (!query.value.trim()) {
      return;
    }
    router.push({ name: 'Search', query: { q: query.value.trim() } });
  }

  return {
    query,
    submitSearch,
  };
}