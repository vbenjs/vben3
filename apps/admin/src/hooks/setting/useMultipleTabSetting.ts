import type { MultiTabsSetting } from '@vben/types';

import { computed } from 'vue';

import { useConfigStoreWithOut } from '@/store/config';

export function useMultipleTabSetting() {
  const configStore = useConfigStoreWithOut()

  const getShowMultipleTab = computed(() => configStore.getMultiTabsSetting.show);

  const getShowQuick = computed(() => configStore.getMultiTabsSetting.showQuick);

  const getShowRedo = computed(() => configStore.getMultiTabsSetting.showRedo);

  const getShowFold = computed(() => configStore.getMultiTabsSetting.showFold);

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    configStore.setProjectConfig({ multiTabsSetting });
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  };
}
