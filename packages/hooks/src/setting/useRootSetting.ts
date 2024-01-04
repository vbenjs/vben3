import { computed } from 'vue'
import { ContentLayoutEnum } from '@vben/constants'
import { useAppConfig } from '../config'

// type RootSetting = Omit<
//   ProjectConfig,
//   'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
// >

export function useRootSetting() {
  const appStore = useAppConfig()

  const getPageLoading = computed(
    () => appStore.transition.value.openPageLoading,
  )

  const getOpenKeepAlive = computed(() => appStore.openKeepAlive.value)

  const getSettingButtonPosition = computed(
    () => appStore.settingButtonPosition.value,
  )

  const getCanEmbedIFramePage = computed(() => appStore.canEmbedIFramePage.value)

  const getPermissionMode = computed(() => appStore.permissionMode.value)

  const getShowLogo = computed(() => appStore.logo.value.show)

  const getContentMode = computed(() => appStore.content.value.mode)

  const getUseOpenBackTop = computed(() => appStore.useOpenBackTop.value)

  const getShowSettingButton = computed(() => appStore.header.value.showSetting)

  const getShowFooter = computed(() => appStore.footer.value.show)

  const getShowBreadCrumb = computed(() => appStore.header.value.showBreadCrumb)

  const getThemeColor = computed(() => appStore.themeColor.value)

  const getShowBreadCrumbIcon = computed(
    () => appStore.header.value.showBreadCrumbIcon,
  )

  const getFullContent = computed(() => appStore.content.value.fullScreen)

  const getColorWeak = computed(() => appStore.colorWeak.value)

  const getGrayMode = computed(() => appStore.grayMode.value)

  const getLockTime = computed(() => appStore.lockTime.value)

  const getShowDarkModeToggle = computed(() => appStore.showThemeModeToggle.value)

  const getLayoutContentMode = computed(() =>
    appStore.content.value.mode === ContentLayoutEnum.FULL
      ? ContentLayoutEnum.FULL
      : ContentLayoutEnum.FIXED,
  )

  const getSessionTimeoutMode = computed(
    () => appStore.sessionTimeoutProcessing.value,
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
    getSessionTimeoutMode,
  }
}
