<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { validateZipcode } from '../utils/validateZipcode';
import type { ZipError } from '../types/errors';
import { validationMessages } from '../types/errors'

const zipcode = ref('')
const validationError = ref<ZipError | null>(null)
const isValid = ref(false)

const emit = defineEmits<{
  (event: 'search', zipcode: string): void
}>()

function handleSubmit() {
  if (!isValid.value) return
  emit('search', zipcode.value)
}

// Live validation
watch(zipcode, (value) => {
  if (!value) {
    validationError.value = null
    isValid.value = false
    return
  }

  const error = validateZipcode(value)
  validationError.value = error
  isValid.value = !error
})

// Computed error message (optional, for cleaner template)
const errorMessage = computed(() => {
  return validationError.value ? validationMessages[validationError.value] : ''
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <div class="postcode-input-area">
      <label for="zipcode">Postal Code</label>
      <input
        id="zipcode"
        v-model="zipcode"
        placeholder="郵便番号を入力してください"
        maxlength="8"
        autocomplete="postal-code"
      />
    </div>

    <button type="submit" :disabled="!isValid">
      検索
    </button>

    <p v-if="errorMessage" class="search-form__error-message">
      {{ errorMessage }}
    </p>
  </form>
</template>


<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.search-form {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  text-align: center;
  font-family: sans-serif;
  border-radius: 8px;
  background-color: #fff;

  &__error-message {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 12px;
    color: red;
    margin-top: 4px;
    white-space: nowrap;
    min-height: 16px;
  }
}

.form-title {
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
}

.subtext {
  font-size: 0.85rem;
  color: #555;
  margin-top: 0.5rem;
}

.input-wrapper {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

input {
  padding: 0.75rem;
  font-size: 1.1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border-color: #409eff;
  }
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: not-allowed;
  transition: background-color 0.3s ease;

  &.valid {
    background-color: #409eff;
    cursor: pointer;
  }
}

</style>