<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
</script>
