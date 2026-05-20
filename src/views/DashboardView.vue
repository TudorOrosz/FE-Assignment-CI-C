<template>
  <div class="page-shell">
    <div class="content">
      <div class="card">
        <h1>Popular genres</h1>
        <p class="muted">Browse trending shows by category and click a card for details.</p>
      </div>

      <section v-if="error" class="card error-message">
        <p>Unable to load shows.</p>
        <p class="muted">{{ error }}</p>
      </section>

      <section v-else>
        <div v-if="loading" class="loading card">Loading show list…</div>
        <div v-else>
          <GenreRow v-for="group in genreGroups" :key="group.title" :title="group.title" :shows="group.shows" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useTvMazeApi } from '../composables/useTvMazeApi';
import GenreRow from '../components/GenreRow.vue';

const genreCategories = ['Drama', 'Comedy', 'Action', 'Science-Fiction', 'Thriller', 'Romance'];

const { popularShows, loading, error, fetchPopularShows } = useTvMazeApi();

onMounted(() => {
  fetchPopularShows();
});

const genreGroups = computed(() => {
  return genreCategories.map((title) => {
    const shows = popularShows.value.filter((show) => show.genres.includes(title)).slice(0, 5);
    return { title, shows: shows.length ? shows : popularShows.value.slice(0, 5) };
  });
});
</script>
