import { defineStore } from 'pinia'
import {
  ContentConfigOptions,
  DefineAppConfigOptions,
  FooterConfigOptions,
  HeaderConfigOptions,
  LogoConfigOptions,
  MenuConfigOptions,
  SidebarConfigOptions,
  TabTbrConfigOptions,
  TransitionConfigOptions,
} from '@vben/types'
import { _assign } from '@vben/utils'
import {
  CacheTypeEnum,
  ContentLayoutEnum,
  HEADER_PRESET_BG_COLOR_LIST,
  MenuModeEnum,
  MixSidebarTriggerEnum,
  NavBarModeEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  SIDE_BAR_BG_COLOR_LIST,
  ThemeEnum,
  TriggerEnum,
} from '@vben/constants'

export const useAppConfig = defineStore({
  id: 'APP_CONFIG',
  state: (): DefineAppConfigOptions => ({
    theme: ThemeEnum.LIGHT,
    navBarMode: NavBarModeEnum.SIDEBAR,
    themeColor: '',
    showThemeModeToggle: true,
    openKeepAlive: true,
    useOpenBackTop: true,
    closeMessageOnSwitch: false,
    removeAllHttpPending: true,
    permissionCacheType: CacheTypeEnum.LOCAL,
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    openSettingDrawer: false,
    permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
    grayMode: false,
    colorWeak: false,
    lockTime: 0,
    useLockPage: false,
    canEmbedIFramePage: true,
    closeMixSidebarOnChange: false,
    sidebar: {
      theme: ThemeEnum.LIGHT,
      show: true,
      visible: true,
      bgColor: SIDE_BAR_BG_COLOR_LIST[0],
      fixed: false,
      width: 210,
      mixSidebarWidth: 80,
      collapsedWidth: 48,
      collapsed: false,
      trigger: TriggerEnum.CENTER,
    },
    menu: {
      canDrag: false,
      split: false,
      mode: MenuModeEnum.VERTICAL,
      accordion: false,
      collapsedShowTitle: false,
      mixSideTrigger: MixSidebarTriggerEnum.CLICK,
      mixSideFixed: false,
      topMenuAlign: 'start',
      dropdownPlacement: 'top-start',
      subMenuWidth: 0,
    },
    header: {
      theme: ThemeEnum.DARK,
      show: true,
      visible: true,
      bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
      fixed: false,
      height: 48,
      showDoc: true,
      showBreadCrumb: true,
      showBreadCrumbIcon: true,
      showFullScreen: true,
      showNotice: true,
      showSearch: true,
      showLocalePicker: true,
      showSetting: true,
    },
    logo: {
      show: true,
      visible: true,
      showTitle: true,
    },
    tabTar: {
      show: true,
      visible: true,
      height: 36,
      cache: true,
      canDrag: false,
      showFold: true,
      showQuick: true,
      showRedo: true,
    },
    content: {
      fullScreen: false,
      mode: ContentLayoutEnum.FULL,
    },
    footer: {
      height: 60,
      show: false,
      visible: false,
    },
    transition: {
      enable: true,
      basicTransition: RouterTransitionEnum.FADE_SIDE,
      openPageLoading: true,
      openNProgress: false,
    },
  }),
  getters: {
    isSidebar: (state) => state.navBarMode === NavBarModeEnum.SIDEBAR,
    isTopMenu: (state) => state.navBarMode === NavBarModeEnum.TOP_MENU,
    isMixSidebar: (state) => state.navBarMode === NavBarModeEnum.MIX_SIDEBAR,
    isMix: (state) => state.navBarMode === NavBarModeEnum.MIX,
    isMixMode: (state) =>
      state.menu.mode === MenuModeEnum.INLINE &&
      state.navBarMode === NavBarModeEnum.MIX,
    isHorizontal: (state) => state.menu.mode === MenuModeEnum.HORIZONTAL,
    getTabTarCache: (state) => state.tabTar.cache,
  },
  actions: {
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setNavBarMode(value: NavBarModeEnum) {
      this.navBarMode = value
    },
    setThemeColor(value: string) {
      this.themeColor = value
    },
    setShowThemeModeToggle(value: boolean) {
      this.showThemeModeToggle = value
    },
    setOpenKeepAlive(value: boolean) {
      this.openKeepAlive = value
    },
    setUseOpenBackTop(value: boolean) {
      this.useOpenBackTop = value
    },
    setCloseMessageOnSwitch(value: boolean) {
      this.closeMessageOnSwitch = value
    },
    setRemoveAllHttpPending(value: boolean) {
      this.removeAllHttpPending = value
    },
    setPermissionCacheType(value: CacheTypeEnum) {
      this.permissionCacheType = value
    },
    setSettingButtonPosition(value: SettingButtonPositionEnum) {
      this.settingButtonPosition = value
    },
    setOpenSettingDrawer(value: boolean) {
      this.openSettingDrawer = value
    },
    setPermissionMode(value: PermissionModeEnum) {
      this.permissionMode = value
    },
    setSessionTimeoutProcessing(value: SessionTimeoutProcessingEnum) {
      this.sessionTimeoutProcessing = value
    },
    setGrayMode(value: boolean) {
      this.grayMode = value
    },
    setColorWeak(value: boolean) {
      this.colorWeak = value
    },
    setLockTime(value: number) {
      this.lockTime = value
    },
    setUseLockPage(value: boolean) {
      this.useLockPage = value
    },
    setCanEmbedIFramePage(value: boolean) {
      this.canEmbedIFramePage = value
    },
    setSidebar(
      value: Partial<
        Omit<SidebarConfigOptions, 'mixSidebarWidth' | 'collapsedWidth'>
      >,
    ) {
      _assign(this.sidebar, value)
    },
    setMenu(value: Partial<MenuConfigOptions>) {
      _assign(this.menu, value)
    },
    setHeader(value: Partial<Omit<HeaderConfigOptions, 'height'>>) {
      _assign(this.header, value)
    },
    setLogo(value: Partial<LogoConfigOptions>) {
      _assign(this.logo, value)
    },
    setTabTar(value: Partial<TabTbrConfigOptions>) {
      _assign(this.tabTar, value)
    },
    setContent(value: Partial<ContentConfigOptions>) {
      _assign(this.content, value)
    },
    setFooter(value: Partial<Omit<FooterConfigOptions, 'height'>>) {
      _assign(this.footer, value)
    },
    setTransition(value: Partial<TransitionConfigOptions>) {
      _assign(this.transition, value)
    },
  },
  persist: {
    // excludedPaths: ['openSettingDrawer'], // Temporarily invalid
    paths: [
      'theme',
      'navBarMode',
      'themeColor',
      'showThemeModeToggle',
      'openKeepAlive',
      'useOpenBackTop',
      'closeMessageOnSwitch',
      'removeAllHttpPending',
      'permissionCacheType',
      'settingButtonPosition',
      'permissionMode',
      'sessionTimeoutProcessing',
      'grayMode',
      'colorWeak',
      'lockTime',
      'useLockPage',
      'canEmbedIFramePage',
      'sidebar',
      'menu',
      'header',
      'logo',
      'tabTar',
      'content',
      'footer',
      'transition',
    ],
  },
})
