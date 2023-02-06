import {
  CacheTypeEnum,
  ContentLayoutEnum,
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
  TriggerEnum,
  RouterTransitionEnum,
} from '@vben/constants'
import { LocaleType } from './config'
// export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  collapsed: boolean
  canDrag: boolean
  show: boolean
  hidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  theme: ThemeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  trigger: TriggerEnum
  accordion: boolean
  closeMixSidebarOnChange: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
  readonly width: number
  readonly mixSidebarWidth: number
  readonly collapsedWidth: number
}

export interface MultiTabsSetting {
  cache: boolean
  show: boolean
  hidden: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
  readonly height: number
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
  show: boolean
  hidden: boolean
  theme: ThemeEnum
  // Turn on full screen
  showFullScreen: boolean
  // Whether to show the lock screen
  useLockPage: boolean
  // Show document button
  showDoc: boolean
  // Show message center button
  showNotice: boolean
  showSearch: boolean
  showLocalePicker: boolean
  readonly height: number
}

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface SporadicSetting {
  // Whether to open the top progress bar
  openNProgress: boolean
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Lock screen time
  lockTime: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Whether to show the configuration button
  showSettingButton: boolean
  // Whether to show the theme switch button
  showDarkModeToggle: boolean
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Configure where the Setting Drawer is displayed
  showSettingDrawer: boolean
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Theme color
  themeColor: string

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean
  // content width
  contentMode: ContentLayoutEnum
  // Whether to display the logo
  showLogo: boolean
  // Whether to show the global footer
  showFooter: boolean
  hiddenFooter: boolean
  readonly footerHeight: number
}

export interface ProjectConfig extends SporadicSetting {
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting
  // Animation configuration
  transitionSetting: TransitionSetting
}
