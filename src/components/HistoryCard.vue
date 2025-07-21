<script setup>
defineProps({ record: Object })
</script>

<template>
  <div class="slide__history-card">
    <p class="zipcode">郵便番号: {{ record.zipcode }}</p>
    <div
      v-for="(item, i) in record.results"
      :key="i"
      class="address-block"
      :class="{ divider: i < record.results.length - 1 }"
    >
      <p><span>住所:</span> {{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</p>
      <p><span>カナ:</span> {{ item.kana1 }} {{ item.kana2 }} {{ item.kana3 }}</p>
    </div>
  </div>
</template>
