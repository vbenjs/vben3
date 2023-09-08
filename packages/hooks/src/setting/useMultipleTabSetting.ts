import type { MultiTabsSetting } from '@vben/types'

import { computed } from 'vue'
import { useAppConfig } from '..'

export function useMultipleTabSetting() {
  const configStore = useAppConfig()

  const getShowMultipleTab = computed(() => configStore.tabTar.value.show)

  const getShowQuick = computed(() => configStore.tabTar.value.showQuick)

  const getShowRedo = computed(() => configStore.tabTar.value.showRedo)

  const getShowFold = computed(() => configStore.tabTar.value.showFold)

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    configStore.setAppConfig({ tabTar: multiTabsSetting })
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  }
}
