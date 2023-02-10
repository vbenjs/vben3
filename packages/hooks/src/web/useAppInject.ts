import { computed, unref } from 'vue'
import { useAppProviderContext } from './useAppContext'

export function useAppInject() {
  const values = useAppProviderContext()

  return {
    isMobile: computed(() => unref(values.isMobile)),
  }
}
