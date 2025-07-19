<script setup lang="ts">
import { useSearchStore } from '../stores/searchStore'
import { storeToRefs } from 'pinia'

const searchStore = useSearchStore()
const { history } = storeToRefs(searchStore)

const mockHistory = [
  {
    zipcode: "0790177",
    results: [
      {
        zipcode: "0790177",
        prefcode: "1",
        address1: "北海道",
        address2: "美唄市",
        address3: "上美唄町協和",
        kana1: "ﾎｯｶｲﾄﾞｳ",
        kana2: "ﾋﾞﾊﾞｲｼ",
        kana3: "ｶﾐﾋﾞﾊﾞｲﾁｮｳｷｮｳﾜ"
      },
      {
        zipcode: "0790177",
        prefcode: "1",
        address1: "北海道",
        address2: "美唄市",
        address3: "上美唄町南",
        kana1: "ﾎｯｶｲﾄﾞｳ",
        kana2: "ﾋﾞﾊﾞｲｼ",
        kana3: "ｶﾐﾋﾞﾊﾞｲﾁｮｳﾐﾅﾐ"
      },
      {
        zipcode: "0790177",
        prefcode: "1",
        address1: "北海道",
        address2: "美唄市",
        address3: "上美唄町北",
        kana1: "ﾎｯｶｲﾄﾞｳ",
        kana2: "ﾋﾞﾊﾞｲｼ",
        kana3: "ｶﾐﾋﾞﾊﾞｲﾁｮｳｷﾀ"
      }
    ]
  }, 
  {
    zipcode: "1000001",
    results: [
      {
        zipcode: "1000001",
        prefcode: "13",
        address1: "東京都",
        address2: "千代田区",
        address3: "千代田",
        kana1: "ﾄｳｷｮｳﾄ",
        kana2: "ﾁﾖﾀﾞｸ",
        kana3: "ﾁﾖﾀﾞ"
      },
      {
        zipcode: "1000001",
        prefcode: "13",
        address1: "東京都",
        address2: "千代田区",
        address3: "丸の内",
        kana1: "ﾄｳｷｮｳﾄ",
        kana2: "ﾁﾖﾀﾞｸ",
        kana3: "ﾏﾙﾉｳﾁ"
      }
    ]
  },
  {
    zipcode: "1500001",
    results: [
      {
        zipcode: "1500001",
        prefcode: "13",
        address1: "東京都",
        address2: "渋谷区",
        address3: "神宮前",
        kana1: "ﾄｳｷｮｳﾄ",
        kana2: "ｼﾌﾞﾔｸ",
        kana3: "ｼﾞﾝｸﾞｳﾏｴ"
      }
    ]
  }
]

</script>

<template>
  <section v-if="history.length" class="history">
    <h3 class="history-title">検索履歴</h3>
    <div class="history-grid">
      <div
        v-for="(record, index) in mockHistory.slice(0, 9)"
        :key="record.zipcode + index"
        class="history-card"
      >
        <p class="history-card__zipcode">郵便番号: {{ record.zipcode }}</p>
        <hr class="history-card__divider" />

        <div
          v-for="(item, index) in record.results"
          :key="item.address1 + item.address2 + index"
          class="history-card__match"
        >
          <p><span>住所:</span> {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
          <p><span>カナ:</span> {{ item.kana1 }}{{ item.kana2 }}{{ item.kana3 }}</p>
          <hr
            v-if="index < record.results.length - 1"
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

    .history-card__match {
      span {
        font-weight: 600;
      }
    }

    p {
      margin: 0.25rem 0;
      color: vars.$color-text-primary;
      font-size: vars.$font-size-base;
    }
  }
}
</style>

