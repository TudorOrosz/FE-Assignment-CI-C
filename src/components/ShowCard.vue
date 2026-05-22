<template>
  <button type="button" class="card show-card" @click="navigateToShow">
    <div class="poster" :style="posterStyle" aria-hidden="true"></div>
    <div class="show-card-content">
      <h3>{{ show.name }}</h3>
      <p class="muted">{{ show.genres.length ? show.genres.join(' • ') : '-' }}</p>
      <div class="show-meta">
        <span class="rating">★ {{ show.rating.average ?? '—' }}</span>
        <span class="year">{{ show.premiered ? show.premiered.slice(0, 4) : '—' }}</span>
      </div>
    </div>
  </button>
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

<style scoped>
.show-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 320px;
  cursor: pointer;
  border: none;
  width: 100%;
  text-align: left;
}

.show-card:hover {
  transform: translateY(-2px);
  transition: transform 160ms ease;
}

.poster {
  min-height: 210px;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.show-card-content h3 {
  margin: 0;
  font-size: 1rem;
}

.show-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.rating,
.year {
  font-size: 0.95rem;
}
</style>