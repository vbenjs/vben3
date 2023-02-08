import { defineStore } from 'pinia'
import { SporadicSetting } from '@vben/types'
import {
  SettingButtonPositionEnum,
  PermissionModeEnum,
  CacheTypeEnum,
  SessionTimeoutProcessingEnum,
  ContentLayoutEnum,
} from '@vben/constants'

export const useSporadicSettingStore = defineStore({
  id: 'LAYOUT_SPORADIC_SETTING',
  // persist: true,
  state: (): SporadicSetting => ({
    // Whether to show the configuration button
    showSettingButton: true,
    // Whether to show the theme switch button
    showDarkModeToggle: true,
    // `Settings` button position
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    // Whether to show the Setting Drawer
    showSettingDrawer: false,
    // Permission mode
    permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    // Permission-related cache is stored in sessionStorage or localStorage
    permissionCacheType: CacheTypeEnum.LOCAL,
    // Session timeout processing
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
    // color
    themeColor: '#0960bd',
    // Website gray mode, open for possible mourning dates
    grayMode: false,
    // Color Weakness Mode
    colorWeak: false,
    // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
    fullContent: false,
    // content mode
    contentMode: ContentLayoutEnum.FULL,
    // Whether to display the logo
    showLogo: true,
    // Whether to show footer
    showFooter: false,
    hiddenFooter: true,
    footerHeight: 60,
    // Whether to open the top progress bar
    openNProgress: false,
    // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
    openKeepAlive: true,
    // Automatic screen lock time, 0 does not lock the screen. Unit minute default 0
    lockTime: 0,
    // Whether to show breadcrumbs
    showBreadCrumb: true,
    // Whether to show the breadcrumb icon
    showBreadCrumbIcon: true,
    // Whether to open back to top
    useOpenBackTop: true,
    //  Is it possible to embed iframe pages
    canEmbedIFramePage: true,
    // Whether to delete unclosed messages and notify when switching the interface
    closeMessageOnSwitch: true,
    // Whether to cancel the http request that has been sent but not responded when switching the interface.
    // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
    removeAllHttpPending: false,
  }),
  getters: {},
  actions: {
    setShowSettingButton(value: boolean) {
      this.showSettingButton = value
    },
    setShowDarkModeToggle(value: boolean) {
      this.showDarkModeToggle = value
    },
    setSettingButtonPosition(value: SettingButtonPositionEnum) {
      this.settingButtonPosition = value
    },
    setShowSettingDrawer(value: boolean) {
      this.showSettingDrawer = value
    },
    toggleSettingDrawerVisible() {
      this.setShowSettingDrawer(!this.showSettingDrawer)
    },
    setPermissionMode(value: PermissionModeEnum) {
      this.permissionMode = value
    },
    setPermissionCacheType(value: CacheTypeEnum) {
      this.permissionCacheType = value
    },
    setSessionTimeoutProcessing(value: SessionTimeoutProcessingEnum) {
      this.sessionTimeoutProcessing = value
    },
    setThemeColor(value: string) {
      this.themeColor = value
    },
    setGrayMode(value: boolean) {
      this.grayMode = value
    },
    setColorWeak(value: boolean) {
      this.colorWeak = value
    },
    setFullContent(value: boolean) {
      this.fullContent = value
    },
    setContentMode(value: ContentLayoutEnum) {
      this.contentMode = value
    },
    setShowLogo(value: boolean) {
      this.showLogo = value
    },
    setShowFooter(value: boolean) {
      this.showFooter = value
      this.setHiddenFooter(!value)
    },
    setHiddenFooter(value: boolean) {
      this.hiddenFooter = value
    },
    setOpenNProgress(value: boolean) {
      this.openNProgress = value
    },
    setOpenKeepAlive(value: boolean) {
      this.openKeepAlive = value
    },
    setLockTime(value: number) {
      this.lockTime = value
    },
    setShowBreadCrumb(value: boolean) {
      this.showBreadCrumb = value
    },
    setShowBreadCrumbIcon(value: boolean) {
      this.showBreadCrumbIcon = value
    },
    setUseOpenBackTop(value: boolean) {
      this.useOpenBackTop = value
    },
    setCanEmbedIFramePage(value: boolean) {
      this.canEmbedIFramePage = value
    },
    setCloseMessageOnSwitch(value: boolean) {
      this.closeMessageOnSwitch = value
    },
    setRemoveAllHttpPending(value: boolean) {
      this.removeAllHttpPending = value
    },
  },
})
