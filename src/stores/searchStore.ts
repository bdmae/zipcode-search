import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ResponseError } from '../types/errors';
import type { ZipcodeResult } from '../types/zipcode';

export const useSearchStore = defineStore('zipcode', () => {
    const results = ref<ZipcodeResult[]>([])
    const responseError = ref<ResponseError | null>(null)
    const isLoading = ref(false)
    const history = ref<ZipcodeResult[]>([])
    const typedZipcode = ref('')

    function addToHistory(result: ZipcodeResult) {
        // is there already an entry with the same zipcode?
        if (!history.value.find(item => item.zipcode === result.zipcode)) {
          history.value.unshift(result)
        }
    }

    // Fetch zipcode data from the API
    async function fetchZipcodeData(zipcode: string) {
        typedZipcode.value = zipcode
        isLoading.value = true
        responseError.value = null

        try {
            const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`)
            const data = await response.json()

            // if api returns an error
            if (data.status !== 200 || !data.results) {
                responseError.value = 'notFound'
                results.value = []
                return
            }


            // add results
            results.value = data.results

            // add first result to history
            addToHistory(data.results[0])
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
        addToHistory,
        responseError,
        isLoading,
        history,
        fetchZipcodeData
    }
})