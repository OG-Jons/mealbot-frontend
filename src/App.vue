<template>
  <div>
    <h1>Diese Seite ist veraltet</h1>
    <h2>Der Mealbot wurde zu <a href="https://mealbot.chunk.moe">https://mealbot.chunk.moe</a> verschoben</h2>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.location.href = 'https://mealbot.chunk.moe';
})
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}
</style>
