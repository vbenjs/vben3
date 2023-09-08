import type { MultiTabsSetting } from '@vben/types'

import { computed } from 'vue'
import { useAppConfig } from '..'

export function useMultipleTabSetting() {
  const configStore = useAppConfig()

  const getShowMultipleTab = computed(() => configStore.tabTar.show)

  const getShowQuick = computed(() => configStore.tabTar.showQuick)

  const getShowRedo = computed(() => configStore.tabTar.showRedo)

  const getShowFold = computed(() => configStore.tabTar.showFold)

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
