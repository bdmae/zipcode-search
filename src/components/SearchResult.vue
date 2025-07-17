<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs }   from 'pinia'

const store = useSearchStore()

// pull in the reactive refs you actually have on the store
const { results, typedZipcode } = storeToRefs(store)
</script>

<template>
  <!-- only show when there are results -->
  <div class="search-result" v-if="results.length">
    <div class="search-result__header">
      郵便番号: {{ typedZipcode }}
    </div>
    <ul class="search-result__list">
      <li
        v-for="item in results"
        :key="item.address1 + item.address2 + item.address3"
        class="search-result__item"
      >
        <div class="search-result__item-label">住所:</div>
        <div class="search-result__item-value">
          {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}
        </div>
        <div class="search-result__item-label">カナ:</div>
        <div class="search-result__item-value">
          {{ item.kana1 }}{{ item.kana2 }}{{ item.kana3 }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as vars;

.search-result {
  width: 100%;
  background-color: vars.$color-card-bg;
  border: 1px solid vars.$color-card-border;
  border-radius: vars.$border-radius-card;
  padding: vars.$padding-card;
  box-sizing: border-box;
  margin: vars.$margin-card-vertical 0;

  &__header {
    font-weight: 500;
    margin-bottom: vars.$margin-header-bottom;
    color: vars.$color-text-primary;
    border-bottom: 1px solid vars.$color-card-border;
    padding-bottom: vars.$padding-header-bottom;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    padding: vars.$padding-item-vertical 0;
    border-bottom: 1px solid vars.$color-card-border;

    &:last-child {
      border-bottom: none;
    }

    display: grid;
    grid-template-columns: auto 1fr;
    grid-row-gap: vars.$grid-row-gap;
    grid-column-gap: vars.$grid-column-gap;

    &-label {
      color: vars.$color-text-secondary;
      font-size: vars.$font-size-item-label;
      white-space: nowrap;
    }

    &-value {
      color: vars.$color-text-primary;
      font-size: vars.$font-size-item-value;
      line-height: vars.$line-height-item;
      word-break: break-word;
    }
  }
}
</style>

