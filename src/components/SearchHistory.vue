<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'

import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import HistoryCard from './HistoryCard.vue'

SwiperCore.use([Navigation])

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

const isMobile = ref(window.innerWidth < 768)
const updateIsMobile = () => (isMobile.value = window.innerWidth < 768)

onMounted(() => window.addEventListener('resize', updateIsMobile))
onUnmounted(() => window.removeEventListener('resize', updateIsMobile))

</script>

<template>
  <section v-if="history.length" class="history-section">
    <h3 class="history-section__title">検索履歴</h3>
    <div class="carousel__wrapper">
      <!-- PC View: use swiper -->
      <Swiper
        v-if="!isMobile"
        :slides-per-view="3"
        :space-between="10"
        :navigation="history.length > 3"
        class="history-swiper"
      >
        <SwiperSlide
          v-for="(record, index) in history"
          :key="record.zipcode + index"
          class="slide"
          v-memo="[record]"
        >
          <HistoryCard :record="record" />
        </SwiperSlide>
      </Swiper>

      <!-- scrollable stacked cards -->
      <div v-else class="mobile-scroll-container">
        <div
          v-for="(record, index) in history"
          :key="record.zipcode + index"
          class="slide"
          v-memo="[record]"
        >
          <HistoryCard :record="record" />
        </div>
      </div>
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

.carousel__wrapper {
  max-height: 600px;

  .history-swiper {
    width: 100%;
  }

  .mobile-scroll-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    padding-bottom: vars.$padding-vertical;
  }

  .slide {
    width: 100%;
  }

  .history-swiper {
    width: 100%;
    height: auto;
  }
}

.slide {
  background-color: white;
  border: 1px solid vars.$color-card-border;
  border-radius: vars.$border-radius-card;
  padding: vars.$padding-card;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;

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

::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
  width: 24px;
  height: 24px;
  background-color: vars.$gray-100;
  border-radius: 50%;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s;

  &::after {
    font-size: 12px;
  }

  &:hover {
    opacity: 1;
  }
}

.swiper-wrapper {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.swiper-vertical {
  .swiper-slide {
    min-height: unset !important;
    height: auto !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: auto;
    z-index: 10;
  }

  .swiper-button-prev {
    top: 0 !important;
  }

  .swiper-button-next {
    bottom: 0 !important;
  }
}

.swiper-vertical .swiper-slide {
  margin-left: auto;
  margin-right: auto;
}

</style>
