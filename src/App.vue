<script setup lang="ts">
import SearchForm from './components/SearchForm.vue'
import SearchHistory from './components/SearchHistory.vue';
import SearchResult from './components/SearchResult.vue';
import { useSearchStore } from './stores/searchStore';
import { storeToRefs } from 'pinia';

const store = useSearchStore()

function onSearch(zipcode: string) {
  store.fetchZipcodeData(zipcode)
}

</script>

<template>
  <div class="main-container">
    <div class="content-wrapper">
      <h1>住所検索</h1>
      <div>
        <p class="explanation-content">
            郵便番号を入力して住所を検索できます。
            郵便番号はハイフン「-」有無どちらでも検索可能です。
           （000-0000、0000000 の形式で入力してください。）
        </p>
      </div>
      <SearchForm @search="onSearch"/>
      <SearchResult/>
      <SearchHistory/>
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
  height: 100vh;

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    // tablet and up
    @include vars.above(vars.$breakpoint-sm) {
      max-width: vars.$max-form-width;
      width: 100%;
    }

    .explanation-content {
      text-align: center;
      color: vars.$color-text-secondary;
    }
  }
}

</style>
