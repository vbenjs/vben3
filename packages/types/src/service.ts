export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RetryRequest {
  isOpenRetry: boolean
  count: number
  waitTime: number
}

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string | (() => string)
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // Whether to send token in header
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

export interface RequestResult<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}
