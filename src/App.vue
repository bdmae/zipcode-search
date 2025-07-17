<script setup lang="ts">
import SearchForm from './components/SearchForm.vue'

</script>

<template>
  <div class="main-container">
    <SearchForm/>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.search-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

</style>
