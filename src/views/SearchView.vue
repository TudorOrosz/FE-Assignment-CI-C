<template>
  <div class="page-shell">
    <div class="content">
      <div class="card">
        <h1>Search results</h1>
        <p class="muted">Results for: <strong>"{{ query }}"</strong></p>
      </div>

      <div v-if="loading" class="loading card">Searching…</div>

      <div v-else-if="error" class="card error-message">
        <p>Unable to search shows.</p>
        <p class="muted">{{ error }}</p>
      </div> 

      <section v-else class="genre-list">
        <ShowCard v-for="show in searchResults" :key="show.id" :show="show" />
        <div v-if="!searchResults.length" class="card empty-state">
          <p>No results found for your query.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTvMazeApi } from '../composables/useTvMazeApi';
import ShowCard from '../components/ShowCard.vue';
import type { Show } from '../types/tvmaze';

const props = defineProps<{ query: string }>();

const searchResults = ref<Show[]>([]);
const { searchShows, loading, error } = useTvMazeApi();

async function runSearch() {
  if (!props.query.trim()) {
    searchResults.value = [];
    return;
  }

  searchResults.value = await searchShows(props.query);
}

onMounted(runSearch);
watch(() => props.query, runSearch); // keeps the reactive search results when navigating back to this view
</script>

<style scoped>
.genre-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

@media (max-width: 640px) {
  .genre-list {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
</style>