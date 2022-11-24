import type { TransitionSetting } from '@vben/types';

import { computed } from 'vue';

import { useConfigStoreWithOut } from '@/store/config'

export function useTransitionSetting() {
  const configStore = useConfigStoreWithOut();

  const getEnableTransition = computed(() => configStore.getTransitionSetting?.enable);

  const getOpenNProgress = computed(() => configStore.getTransitionSetting?.openNProgress);

  const getOpenPageLoading = computed((): boolean => {
    return !!configStore.getTransitionSetting?.openPageLoading;
  });

  const getBasicTransition = computed(() => configStore.getTransitionSetting?.basicTransition);

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    configStore.setProjectConfig({ transitionSetting });
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
