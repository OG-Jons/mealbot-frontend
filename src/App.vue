<template>
  <notifications />
  <Suspense>
    <template #default>
      <div class="wrapper">
        <SubscribeCard />
      </div>
    </template>
    <template #fallback>
      <div class="wrapper">
        <SubscribeCardSkeleton /></div
    ></template>
  </Suspense>
</template>

<script setup>
import SubscribeCard from './components/SubscribeCard.vue';
import SubscribeCardSkeleton from './components/SubscribeCardSkeleton.vue';
</script>

<style scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}
</style>
