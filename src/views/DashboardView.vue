<template>
  <div class="page-shell">
    <div class="content">
      <div class="card">
        <h1>Popular genres</h1>
        <p class="muted">Browse trending shows by category and click a card for details.</p>
      </div>

      <div class="card filter-card">
        <label for="genre-filter" class="filter-label">Filter by genre</label>
        <select id="genre-filter" v-model="selectedGenre" class="filter-select" aria-label="Filter by genre">
          <option v-for="genre in filterGenres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <section v-if="error" class="card error-message">
        <p>Unable to load shows.</p>
        <p class="muted">{{ error }}</p>
      </section>

      <section v-else>
        <div v-if="loading" class="loading card">Loading show list…</div>
        <div v-else>
          <template v-if="selectedGenre === 'All'">
            <GenreRow v-for="group in genreGroups" :key="group.title" :title="group.title" :shows="group.shows" />
          </template>

          <template v-else>
            <GenreRow v-if="filteredShows.length" :title="selectedGenre" :shows="filteredShows" />
            <div v-else class="card empty-state">
              <p>No shows found for {{ selectedGenre }} in this dataset.</p>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTvMazeApi } from '../composables/useTvMazeApi';
import GenreRow from '../components/GenreRow.vue';

const route = useRoute();
const router = useRouter();

const genreCategories = ['Drama', 'Comedy', 'Action', 'Science-Fiction', 'Thriller', 'Romance'];
const filterGenres = ['All', 'Action', 'Adult', 'Adventure', 'Anime', 'Children', 'Comedy', 'Crime', 'DIY', 'Drama', 'Espionage', 'Family', 'Fantasy', 'Food', 'History', 'Horror', 'Legal', 'Medical', 'Music', 'Mystery', 'Nature', 'Romance', 'Science-Fiction', 'Sports', 'Supernatural', 'Thriller', 'Travel', 'War', 'Western'];

const { popularShows, genreShows, loading, error, fetchPopularShows, fetchMoreShowsByGenre } = useTvMazeApi();
const selectedGenre = ref('All');

onMounted(() => {
  fetchPopularShows();
});

watch(
  () => route.query.reset,
  () => {
    if (route.query.reset) {
      selectedGenre.value = 'All';
      router.replace({ name: 'Dashboard' });
    }
  },
  { immediate: true }
);

watch(
  selectedGenre,
  async (newGenre) => {
    if (newGenre !== 'All') {
      const hasLazyData = genreShows.value[newGenre]?.length;
      if (!hasLazyData) {
        const showsForGenre = popularShows.value.filter((show) =>
          show.genres.includes(newGenre)
        );
        if (showsForGenre.length < 30) {
          await fetchMoreShowsByGenre(newGenre);
        }
      }
    }
  }
);

const genreGroups = computed(() => {
  return genreCategories.map((title) => {
    const shows = popularShows.value.filter((show) => show.genres.includes(title)).slice(0, 5);
    return { title, shows: shows.length ? shows : popularShows.value.slice(0, 5) };
  });
});

const filteredShows = computed(() => {
  if (selectedGenre.value === 'All') {
    return [];
  }

  // Use lazy-loaded data if available
  if (genreShows.value[selectedGenre.value]?.length) {
    return genreShows.value[selectedGenre.value];
  }

  // Fall back to filtering popularShows
  return popularShows.value
    .filter((show) => show.genres.includes(selectedGenre.value))
    .slice(0, 30);
});
</script>

<style scoped>
.filter-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-weight: 600;
}

.filter-select {
  min-width: 220px;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  padding: 10px 12px;
  background: var(--white-bg);
}

.empty-state {
  text-align: center;
  padding: 24px;
}

@media (max-width: 640px) {
  .filter-card {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    min-width: 0;
    width: 100%;
  }
}
</style>