import { defineStore } from 'pinia'
import { TransitionSetting } from '@vben/types'
import { RouterTransitionEnum } from '@vben/constants'

export const useTransitionSettingStore = defineStore({
  id: 'LAYOUT_TRANSITION_SETTING',
  // persist: true,
  state: (): TransitionSetting => ({
    //  Whether to open the page switching animation
    // The disabled state will also disable pageLoading
    enable: true,

    // Route basic switching animation
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading
    // Only open when enable=true
    openPageLoading: true,

    // Whether to open the top progress bar
    openNProgress: false,
  }),
  getters: {},
  actions: {
    setEnable(value: boolean) {
      this.enable = value
    },
    setBasicTransition(value: RouterTransitionEnum) {
      this.basicTransition = value
    },
    setOpenPageLoading(value: boolean) {
      this.openPageLoading = value
    },
    setOpenNProgress(value: boolean) {
      this.openNProgress = value
    },
  },
})
