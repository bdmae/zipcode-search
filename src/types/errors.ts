// validation errors
export const validationMessages = {
  invalidCharacters: '郵便番号は半角数字のみまたは半角数字とハイフンのみで入力してください。',
  invalidFormat: '郵便番号は半角数字でハイフンありの8桁かハイフンなしの7桁で入力してください。',
} as const

export type ZipError = keyof typeof validationMessages

// server errors
export const serverMessages = {
  notFound: '郵便番号が存在しません。',
  networkError: 'エラーが発生しました。',
} as const

export type ResponseError = keyof typeof serverMessages
