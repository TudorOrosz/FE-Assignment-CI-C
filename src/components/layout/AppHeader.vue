<template>
  <header
    class="header"
    @click="navigateToDashboard"
  >
    <div class="account-title">TV Maze</div>
  </header>
  <section class="search-row">
    <input
      v-model="query"
      @keyup.enter="submitSearch"
      type="search"
      placeholder="Search TV shows..."
      aria-label="Search TV shows"
    />
    <button class="btn" @click="submitSearch">Search</button>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSearch } from '../../composables/useSearch';

const router = useRouter();

function navigateToDashboard() {
  router.push({ name: 'Dashboard' });
}

const { query, submitSearch } = useSearch();
</script>