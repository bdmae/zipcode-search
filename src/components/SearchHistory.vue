<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

</script>

<template>
  <section v-if="history.length" class="history">
    <h3>検索履歴</h3>
    <div class="history-grid">
      <div
        v-for="(record, i) in history.slice(0, 9)"
        :key="record.zipcode + i"
        class="history-card"
      >
        <p class="history-card__zipcode">郵便番号: {{ record.zipcode }}</p>
        <hr class="history-card__divider" />

        <div
          v-for="(item, j) in record.results"
          :key="item.address1 + item.address2 + j"
          class="history-card__match"
        >
          <p>住所: {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
          <p>カナ: {{ item.kana1 }}{{ item.kana2 }}{{ item.kana3 }}</p>
          <hr
            v-if="j < record.results.length - 1"
            class="history-card__divider"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss">
@use '../assets/styles/variables' as vars;

.history {
  /* keep the section from growing forever */
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  width: 100%;

  .history-grid {
    /* let the grid fill the remaining space and scroll if it overflows */
    flex: 1 1 auto;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: vars.$gap-size-l;
    margin-bottom: 2rem;

    @include vars.above(vars.$breakpoint-md) {
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

    p {
      margin: 0.25rem 0;
      color: vars.$color-text-primary;
      font-size: vars.$font-size-base;
    }
  }
}
</style>

