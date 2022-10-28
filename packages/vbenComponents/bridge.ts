import { ComputedRef } from 'vue'

export type LocaleReturn = {
  getLocale: ComputedRef<string>
  changeLocale: (locale: string) => Promise<string | undefined>
}

export interface ContextOptions {
  useLocale: () => LocaleReturn
  localeList: Array<any>
  useAppStore: () => unknown
}

export let context: ContextOptions = {
  useLocale: () => ({} as LocaleReturn),
  useAppStore: () => undefined,
  localeList: [],
}

export const initComp = async (func: AnyFunction<any>) => {
  context = func()
}
