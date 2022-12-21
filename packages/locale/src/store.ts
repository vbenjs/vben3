import type { LocaleType } from '@vben/types'
import { computed } from 'vue'
import { LOCALE_KEY } from '@vben/constants'
import { useLocalStorage } from '@vben/utils'
import { localeSetting } from './config'

const store = useLocalStorage(LOCALE_KEY, localeSetting)

export function setLocale(locale: LocaleType) {
  store.value.locale = locale
}

export const getLocale = computed(() => store.value.locale)
