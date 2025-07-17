// types/search.ts
import type { ZipcodeResult } from './zipcode'

export interface SearchRecord {
  zipcode: string
  results: ZipcodeResult[]
}
