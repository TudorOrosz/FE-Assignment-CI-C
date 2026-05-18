<template>
  <div class="page-shell">
    <div class="content">
      <div class="card detail-card" v-if="show">
        <div class="detail-top">
          <div class="detail-poster" :style="posterStyle" aria-hidden="true"></div>
          <div class="detail-meta">
            <h1>{{ show.name }}</h1>
            <p class="muted">{{ show.genres.join(' • ') || 'Drama' }}</p>
            <p class="detail-label">Rating: <strong>{{ show.rating.average ?? 'N/A' }}</strong></p>
            <p class="detail-label">Status: <strong>{{ show.status }}</strong></p>
            <p class="detail-label">Premiered: <strong>{{ show.premiered || '—' }}</strong></p>
            <a v-if="show.officialSite" :href="show.officialSite" target="_blank" rel="noreferrer" class="btn detail-link">Visit official site</a>
          </div>
        </div>
        <div class="summary" v-html="show.summary || '<p>No description available.</p>'"></div>
      </div>

      <div v-if="loading" class="loading card">Loading show details…</div>
      <div v-if="error" class="card error-message">
        <p>Unable to load details.</p>
        <p class="muted">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTvMazeApi } from '../composables/useTvMazeApi';

const route = useRoute();
const show = ref(null);
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
