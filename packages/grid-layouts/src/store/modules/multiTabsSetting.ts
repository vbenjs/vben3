import { defineStore } from 'pinia'
import { MultiTabsSetting } from '@vben/types'

export const useMultiTabsSettingStore = defineStore({
  id: 'LAYOUT_MULTI_TABS_SETTING',
  // persist: true,
  state: (): MultiTabsSetting => ({
    cache: false,
    // Turn on
    show: true, // Turn on
    hidden: false,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true,
    height: 36,
  }),
  getters: {},
  actions: {
    setCache(value: boolean) {
      this.cache = value
    },
    setShow(value: boolean) {
      this.show = value
      this.hidden = !value
    },
    setHidden(value: boolean) {
      this.hidden = value
    },
    setCanDrag(value: boolean) {
      this.canDrag = value
    },
    setShowQuick(value: boolean) {
      this.showQuick = value
    },
    setShowRedo(value: boolean) {
      this.showRedo = value
    },
    setShowFold(value: boolean) {
      this.showFold = value
    },
  },
})
