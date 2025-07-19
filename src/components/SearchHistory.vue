<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

</script>

<template>
  <section v-if="history.length" class="history">
    <h3 class="history-title">検索履歴</h3>
    <div class="history-grid">
      <div
        v-for="(record, index) in history.slice(0, 9)"
        :key="record.zipcode + index"
        class="history-card"
      >
        <p class="history-card__zipcode">郵便番号: {{ record.zipcode }}</p>
        <div
          v-for="(item, index) in record.results"
          :key="item.address1 + item.address2 + index"
          :class="['history-card__match', { 'history-card__divider': index < record.results.length - 1 }]"
        >
          <p><span>住所:</span> {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
          <p><span>カナ:</span> {{ item.kana1 }}{{ item.kana2 }}{{ item.kana3 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as vars;

.history {
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  width: 100%;

  .history-title {
    font-size: vars.$font-size-lg;
    font-weight: 600;
    margin-bottom: vars.$margin-size-m;
    text-align: center;
  }

  .history-grid {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: vars.$gap-size-l;
    padding-bottom: 2rem;

    @include vars.above(vars.$breakpoint) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .history-card {
    width: 100%;                              
    background-color: vars.$color-card-bg;
    border: 1px solid vars.$color-card-border;
    border-radius: vars.$border-radius-card;
    padding: vars.$padding-card;
    box-sizing: border-box;

    span { font-weight: 600; }

    &__match {
      padding: vars.$padding-item-vertical 0;
    }

    &__divider {
      border-bottom: 1px solid vars.$color-card-border;
    }

    p {
      margin: 0.25rem 0;
      color: vars.$color-text-primary;
      font-size: vars.$font-size-base;
    }
  }
}
</style>

