<template>
  <article class="card show-card" @click="navigateToShow" role="button" tabindex="0">
    <div class="poster" :style="posterStyle" aria-hidden="true"></div>
    <div class="show-card-content">
      <h3>{{ show.name }}</h3>
      <p class="muted">{{ show.genres.join(' • ') || 'Drama' }}</p>
      <div class="show-meta">
        <span class="rating">★ {{ show.rating.average ?? 'N/A' }}</span>
        <span class="year">{{ show.premiered ? show.premiered.slice(0, 4) : '—' }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Show } from '../types/tvmaze';

const props = defineProps<{ show: Show }>();
const router = useRouter();

const posterStyle = computed(() => ({
  backgroundImage: props.show.image ? `url(${props.show.image.original})` : `linear-gradient(135deg, rgba(0,76,76,0.15), rgba(0,76,76,0.05))`,
}));

function navigateToShow() {
  router.push({ name: 'ShowDetail', params: { id: props.show.id } });
}
</script>
