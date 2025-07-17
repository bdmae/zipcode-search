<!-- components/SearchHistory.vue -->

<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore';
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

</script>


<template>
  <section class="history">
    <h3>検索履歴</h3>
    <div class="history-grid">
      <div v-for="(item, index) in history" :key="index" class="history-card">
        <p>郵便番号: {{ item.zipcode }}</p>
        <p>住所: {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
        <p>カナ: {{ item.kana1 }}{{ item.kana2 }}{{ item.kana3 }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.history {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .history-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .history-card {
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;

    p {
      margin: 0.25rem 0;
    }
  }
}
</style>
