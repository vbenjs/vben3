import type { TransitionSetting } from '@vben/types'

import { computed } from 'vue'

import { useAppConfig } from '..'

export function useTransitionSetting() {
  const configStore = useAppConfig()

  const getEnableTransition = computed(() => configStore.transition.value.enable)

  const getOpenNProgress = computed(() => configStore.transition.value.openNProgress)

  const getOpenPageLoading = computed((): boolean => {
    return !!configStore.transition.value.openPageLoading
  })

  const getBasicTransition = computed(
    () => configStore.transition.value.basicTransition,
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
