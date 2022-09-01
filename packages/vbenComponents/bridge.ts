import { ComputedRef } from 'vue'

export type LocaleReturn = {
  getLocale: ComputedRef<string>
  changeLocale: (locale: string) => Promise<string | undefined>
}

export interface ContextOptions {
  useLocale: () => LocaleReturn
  localeList: Array<any>
}

export let context: ContextOptions = {
  useLocale: () => ({} as LocaleReturn),
  localeList: [],
}

export const initComp = async (func: AnyFunction<any>) => {
  context = func()
}
