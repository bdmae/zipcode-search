<script setup lang="ts">
import { computed } from 'vue'
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

const showNavigationButtons = computed(() => history.value.length > 3)

const config = {
  itemsToShow: 1,
  gap: 10,
  snapAlign: 'start',
  breakpointMode: 'carousel',
  wrapAround: false,
  breakpoints: {
    768: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
  },
} as const

</script>

<template>
  <section v-if="history.length" class="history-section">
    <h3 class="history-section__title">検索履歴</h3>
    <div class="carousel__wrapper">
      <Carousel v-bind="config">
        <Slide v-for="(record, index) in history" :key="record.zipcode + index" class="slide" v-memo="[record]">
          <div class="slide__history-card">
            <p class="zipcode">郵便番号: {{ record.zipcode }}</p>

            <div
              v-for="(item, i) in record.results"
              :key="i"
              class="address-block"
              :class="{ 'divider': i < record.results.length - 1 }"
            >
              <p><span>住所:</span> {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
              <p><span>カナ:</span> {{ item.kana1 }} {{ item.kana2 }} {{ item.kana3 }}</p>
            </div>
          </div>
        </Slide>

        <template #addons v-if="showNavigationButtons">
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as vars;

.history-section {
  width: 100%;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: vars.$margin-header-bottom;
    color: vars.$color-text-primary;
    text-align: center;
  }
}

.slide {
  background-color: white;
  border-radius: 12px;
  height: 100%;
  width: 100%;
  max-width: 320px;
  border: 1px solid vars.$color-card-border;
  border-radius: vars.$border-radius-card;
  padding: vars.$padding-card;

  &__history-card {
    width: 100%;
  }

  .zipcode {
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  .address-block {
    padding: 0.5rem 0;

    &.divider {
      border-bottom: 1px solid #ccc;
    }

    p {
      margin: 0.25rem 0;
      font-size: 0.95rem;
    }

    span {
      font-weight: bold;
    }
  }
}

</style>
