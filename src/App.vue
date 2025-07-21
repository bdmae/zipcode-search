<script setup lang="ts">
import { storeToRefs } from 'pinia';
import SearchForm from './components/SearchForm.vue'
import SearchHistory from './components/SearchHistory.vue';
import SearchResult from './components/SearchResult.vue';
import { useSearchStore } from './stores/searchStore';

const store = useSearchStore()

const { isLoading } = storeToRefs(store)

function onSearch(zipcode: string) {
  store.fetchZipcodeData(zipcode)
}

</script>

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <h1>住所検索</h1>
      <div class="explanation">
        <p>
            郵便番号を入力して住所を検索できます。
            郵便番号はハイフン「-」有無どちらでも検索可能です。
        </p>
        <p>
          （00-0000、0000000 の形式で入力してください。）
        </p>
      </div>
      <SearchForm @search="onSearch"/>
      <div v-if="isLoading" class="loading">
        <p>検索中です...</p>
      </div>
      <template v-else>
        <SearchResult />
        <SearchHistory />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './assets/styles/variables' as vars;

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    // tablet and up
    @include vars.above(vars.$breakpoint) {
      width: 100%;
      max-width: vars.$max-width;
    }

    .explanation {
      text-align: center;
      color: vars.$color-text-secondary;
    }
  }
}

</style>
