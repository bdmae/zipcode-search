import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResponseError } from '../types/errors'
import type { ZipcodeResult } from '../types/zipcode'
import type { SearchRecord }  from '../types/search'

export const useSearchStore = defineStore('zipcode', () => {
  const results       = ref<ZipcodeResult[]>([])
  const responseError = ref<ResponseError | null>(null)
  const isLoading     = ref(false)

  const history       = ref<SearchRecord[]>([])
  const typedZipcode  = ref('')

  function addToHistory(record: SearchRecord) {
    if (!history.value.find(r => r.zipcode === record.zipcode)) {
      history.value.unshift(record)
    }
  }

  async function fetchZipcodeData(zipcode: string) {
    typedZipcode.value = zipcode
    isLoading.value    = true
    responseError.value = null

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
      )
      const data = await response.json()

      if (data.status !== 200 || !data.results) {
        responseError.value = 'notFound'
        results.value = []
        return
      }

      // 1) store all the matches in results
      results.value = data.results

      // 2) record the entire array as one history entry
      addToHistory({
        zipcode,
        results: data.results,
      })
    } catch (err) {
      console.error('Network error:', err)
      responseError.value = 'networkError'
      results.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    results,
    typedZipcode,
    responseError,
    isLoading,
    history,
    fetchZipcodeData,
  }
})
