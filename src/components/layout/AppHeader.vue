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
const { query, submitSearch } = useSearch();

function navigateToDashboard() {
  query.value = '';
  router.push({ name: 'Dashboard', query: { reset: Date.now().toString() } });
}
</script>

<style scoped>
header.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--brand);
  color: var(--white-bg);
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.25rem;
  user-select: none;
  margin-bottom: 16px;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

header.header:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

header.header:focus {
  outline: 3px solid rgba(0, 76, 76, 0.12);
  outline-offset: 2px;
}

.account-title {
  font-size: 1.25rem;
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
}

.search-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-row input {
  flex: 1 1 320px;
  min-width: 0;
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  padding: 12px 14px;
  background: var(--white-bg);
}

@media (max-width: 640px) {
  .search-row button {
    display: none;
  }
}
</style>