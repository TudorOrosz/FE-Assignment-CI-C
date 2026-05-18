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