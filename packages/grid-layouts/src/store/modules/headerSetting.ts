import { defineStore } from 'pinia'
import { HeaderSetting } from '@vben/types'
import { ThemeEnum, HEADER_PRESET_BG_COLOR_LIST } from '@vben/constants'

export const useHeaderSettingStore = defineStore({
  id: 'LAYOUT_HEADER_SETTING',
  // persist: true,
  state: (): HeaderSetting => ({
    // header bg color
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show dom
    hidden: false,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
    showDoc: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true,
    showLocalePicker: true,
    height: 48,
  }),
  getters: {
    isDark: (state) => state.theme === ThemeEnum.DARK,
  },
  actions: {
    setBgColor(value: string) {
      this.bgColor = value
    },
    setFixed(value: boolean) {
      this.fixed = value
    },
    setShow(value: boolean) {
      this.show = value
      this.setHidden(!value)
    },
    setHidden(value: boolean) {
      this.hidden = value
    },
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setUseLockPage(value: boolean) {
      this.useLockPage = value
    },
    setShowFullScreen(value: boolean) {
      this.showFullScreen = value
    },
    setShowDoc(value: boolean) {
      this.showDoc = value
    },
    setShowNotice(value: boolean) {
      this.showNotice = value
    },
    setShowSearch(value: boolean) {
      this.showSearch = value
    },
    setShowLocalePicker(value: boolean) {
      this.showLocalePicker = value
    },
  },
})
