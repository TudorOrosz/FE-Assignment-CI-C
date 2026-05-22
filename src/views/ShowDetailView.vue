<template>
  <div class="page-shell">
    <div class="content">
      <div v-if="loading" class="loading card">Loading show details…</div>

      <div v-else-if="error" class="card error-message">
        <p>Unable to load details.</p>
        <p class="muted">{{ error }}</p>
      </div>

      <div class="card detail-card" v-else-if="show">
        <div class="detail-top">
          <div class="detail-poster" :style="posterStyle" aria-hidden="true"></div>
          <div class="detail-meta">
            <h1>{{ show.name }}</h1>
            <p class="muted">{{show.genres.length ? show.genres.join(' • ') : '-' }}</p>
            <p class="detail-label">Rating: <strong>{{ show.rating.average ?? '-' }}</strong></p>
            <p class="detail-label">Status: <strong>{{ show.status }}</strong></p>
            <p class="detail-label">Premiered: <strong>{{ show.premiered || '—' }}</strong></p>
            <a v-if="show.officialSite" :href="show.officialSite" target="_blank" rel="noreferrer" class="btn detail-link">Visit official site</a>
          </div>
        </div>
        <div class="summary" v-html="show.summary || '<p>No description available.</p>'"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTvMazeApi } from '../composables/useTvMazeApi';
import type { Show } from '../types/tvmaze';

const route = useRoute();
const show = ref<Show | null>(null);
const { fetchShowDetails, loading, error } = useTvMazeApi();

async function loadDetails() {
  const id = route.params.id as string;
  show.value = await fetchShowDetails(id);
}

onMounted(loadDetails);

const posterStyle = computed(() => {
  if (!show.value || !show.value.image) {
    return { background: 'linear-gradient(135deg, rgba(0,76,76,0.15), rgba(0,76,76,0.05))' };
  }
  return { backgroundImage: `url(${show.value.image.original})` };
});
</script>

<style scoped>
.detail-card {
  display: grid;
  gap: 24px;
}

.detail-top {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 24px;
  align-items: start;
}

.detail-poster {
  min-height: 320px;
  border-radius: 18px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.detail-meta h1 {
  margin: 0 0 12px;
}

.detail-label {
  margin: 8px 0;
}

.detail-link {
  display: inline-block;
  margin-top: 12px;
}

.summary {
  line-height: 1.75;
}

@media (max-width: 840px) {
  .detail-top {
    grid-template-columns: 1fr;
  }
}
</style>
