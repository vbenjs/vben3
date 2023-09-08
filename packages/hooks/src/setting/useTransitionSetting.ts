import type { TransitionSetting } from '@vben/types'

import { computed } from 'vue'

import { useAppConfig } from '..'

export function useTransitionSetting() {
  const configStore = useAppConfig()

  const getEnableTransition = computed(() => configStore.transition.enable)

  const getOpenNProgress = computed(() => configStore.transition.openNProgress)

  const getOpenPageLoading = computed((): boolean => {
    return !!configStore.transition.openPageLoading
  })

  const getBasicTransition = computed(
    () => configStore.transition.basicTransition,
  )

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    configStore.setAppConfig({ transition: transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}
