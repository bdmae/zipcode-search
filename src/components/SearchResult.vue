<!-- components/SearchResult.vue -->
<template>
  <div v-if="zipcode && address && kana" class="search-result">
    <h2>郵便番号: {{ zipcode }}</h2>
    <p>住所: {{ address }}</p>
    <p>カナ: {{ kana }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  zipcode: string
  address: string
  kana: string
}>()
</script>

<style scoped lang="scss">
.search-result {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: #fff;

  h2 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
  }
}
</style>
