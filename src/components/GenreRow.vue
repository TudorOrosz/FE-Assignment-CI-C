<template>
  <section class="genre-row">
    <div class="genre-heading">
      <h2>{{ title }}</h2>
      <span class="muted">{{ shows.length }} shows</span>
    </div>
    <div class="genre-list">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Show } from '../types/tvmaze';
import ShowCard from './ShowCard.vue';

const props = defineProps<{ title: string; shows: Show[] }>();
</script>

<style scoped>
.genre-row {
  margin-bottom: 24px;
}

.genre-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.genre-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

@media (max-width: 640px) {
  .genre-list {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
</style>