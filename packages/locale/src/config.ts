import type { LocaleConfig, LocaleType } from '@vben/types'

export const LOCALE: { [key: string]: LocaleType } = {
  zh: 'zh_CN',
  en: 'en',
}

export const localeSetting: LocaleConfig = {
  // Locale
  locale: LOCALE.zh,
  // Default locale
  fallback: LOCALE.zh,
  // available Locales
  availableLocales: [LOCALE.zh, LOCALE.en],
}

// locale list
export const localeList: any[] = [
  {
    text: '简体中文',
    event: LOCALE.zh,
  },
  {
    text: 'English',
    event: LOCALE.en,
  },
]
