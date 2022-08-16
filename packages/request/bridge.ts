import type { ErrorMessageMode } from '@vben/types'

export interface ContextOptions {
  errorFunction: AnyFunction<any>
  errorModalFunction: AnyFunction<any>
  getTokenFunction: () => unknown
  unauthorizedFunction: (msg?: string) => void
  timeoutFunction: () => void
  handleErrorFunction: (message?: string, mode?: ErrorMessageMode) => void
  apiUrl?: string
}

export let context: ContextOptions = {
  getTokenFunction: () => undefined,
  unauthorizedFunction: () => {},
  errorFunction: () => {},
  errorModalFunction: () => {},
  handleErrorFunction: () => {},
  timeoutFunction: () => {},
  apiUrl: '',
}

export const initRequest = async (func: AnyFunction<any>) => {
  context = func()
}
