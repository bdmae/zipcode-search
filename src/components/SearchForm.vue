<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { validateZipcode } from '../utils/validateZipcode';
import type { ZipError } from '../types/errors';
import { validationErrorMessages } from '../types/errors';

const zipcode = ref('')
const validationError = ref<ZipError | null>(null)

const emit = defineEmits<{
  (event: 'search', zipcode: string): void
}>()

const hasInput = computed(() => zipcode.value.trim().length > 0)

function handleSubmit(): void {
  if (!hasInput) return

  const error = validateZipcode(zipcode.value)
  validationError.value = error
  if (error) return

  emit('search', zipcode.value)
}

watch(zipcode, (value) => {
  if (!value) {
    validationError.value = null
    return
  }
  validationError.value = validateZipcode(value)
})

const errorMessage = computed(() => {
  return validationError.value ? validationErrorMessages[validationError.value] : ''
})

</script>

<template>
  <form @submit.prevent="handleSubmit" class="search-form">
    <div class="postcode-input-area">
      <input
        id="zipcode"
        v-model="zipcode"
        placeholder="郵便番号を入力してください"
        maxlength="8"
        autocomplete="postal-code"
      />
      <button type="submit" :disabled="!hasInput">
        検索
      </button>
    </div>
    <div class="error-message-container">
      <p v-if="errorMessage" class="search-form__error-message">
        {{ errorMessage }}
      </p>
    </div>
  </form>
</template>


<style scoped lang="scss">
@use '../assets/styles/variables' as vars;

.search-form {
  width: 100%;
  padding: vars.$padding-form;
  text-align: left;
  font-family: sans-serif;

  @include vars.above(vars.$breakpoint) {
      width: 80%;
    }

  .postcode-input-area {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    gap: vars.$gap-size-l;
    height: 4rem;

    label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: vars.$font-size-item-label;
    }

    input {
      padding: vars.$padding-input;
      font-size: vars.$font-size-base;
      border-radius: vars.$border-radius-input;
      border: 1px solid vars.$color-disabled;
      outline: none;
      width: 100%;

      &:focus {
        border-color: vars.$color-primary;
      }
    }
  }

  .error-message-container {
    margin-top: 0.5rem;
    height: 4rem;    
  }

  .search-form__error-message {
    text-align: center;
    font-size: vars.$font-size-small;
    color: vars.$color-error;
  }

  button {
    width: vars.$button-width;
    padding: vars.$padding-input;
    font-size: vars.$font-size-lg;
    border: none;
    border-radius: vars.$border-radius;
    color: #fff;
    transition: background-color 0.3s ease, cursor 0.3s ease;

    &:disabled {
      background-color: vars.$color-disabled;
      cursor: not-allowed;
    }
    &:not(:disabled) {
      background-color: vars.$color-primary;
      cursor: pointer;
    }
  }
}
</style>
