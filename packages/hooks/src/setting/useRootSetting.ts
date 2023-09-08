import { computed } from 'vue'
import { ContentLayoutEnum } from '@vben/constants'
import { useAppConfig } from '../config'

// type RootSetting = Omit<
//   ProjectConfig,
//   'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
// >

export function useRootSetting() {
  const appStore = useAppConfig()

  const getPageLoading = computed(() => appStore.transition.openPageLoading)

  const getOpenKeepAlive = computed(() => appStore.openKeepAlive)

  const getSettingButtonPosition = computed(
    () => appStore.settingButtonPosition,
  )

  const getCanEmbedIFramePage = computed(() => appStore.canEmbedIFramePage)

  const getPermissionMode = computed(() => appStore.permissionMode)

  const getShowLogo = computed(() => appStore.logo.show)

  const getContentMode = computed(() => appStore.content.mode)

  const getUseOpenBackTop = computed(() => appStore.useOpenBackTop)

  const getShowSettingButton = computed(() => appStore.header.showSetting)

  const getShowFooter = computed(() => appStore.footer.show)

  const getShowBreadCrumb = computed(() => appStore.header.showBreadCrumb)

  const getThemeColor = computed(() => appStore.themeColor)

  const getShowBreadCrumbIcon = computed(
    () => appStore.header.showBreadCrumbIcon,
  )

  const getFullContent = computed(() => appStore.content.fullScreen)

  const getColorWeak = computed(() => appStore.colorWeak)

  const getGrayMode = computed(() => appStore.grayMode)

  const getLockTime = computed(() => appStore.lockTime)

  const getShowDarkModeToggle = computed(() => appStore.showThemeModeToggle)

  const getLayoutContentMode = computed(() =>
    appStore.content.mode === ContentLayoutEnum.FULL
      ? ContentLayoutEnum.FULL
      : ContentLayoutEnum.FIXED,
  )
  // TODO 待实现
  // const getDarkMode = computed(() => configStore.getDarkMode)

  // TODO 待实现
  // function setRootSetting(setting: Partial<RootSetting>) {
  //   configStore.setProjectConfig(setting)
  // }
  // TODO 待实现
  // function setDarkMode(mode: ThemeEnum) {
  //   configStore.setDarkMode(mode)
  // }
  return {
    // setRootSetting,

    getSettingButtonPosition,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getLockTime,
    getThemeColor,
    // getDarkMode,
    // setDarkMode,
    getShowDarkModeToggle,
  }
}
