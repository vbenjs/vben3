import type { ProjectConfig } from '@vben/types'
import { computed } from 'vue'
import { useConfigStoreWithOut } from '@/store/config'
import { ContentLayoutEnum } from '@vben/constants'

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>

export function useRootSetting() {
  const appStore = useConfigStoreWithOut()

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive,
  )

  const getSettingButtonPosition = computed(
    () => appStore.getProjectConfig.settingButtonPosition,
  )

  const getCanEmbedIFramePage = computed(
    () => appStore.getProjectConfig.canEmbedIFramePage,
  )

  const getPermissionMode = computed(
    () => appStore.getProjectConfig.permissionMode,
  )

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  const getContentMode = computed(() => appStore.getProjectConfig.contentMode)

  const getUseOpenBackTop = computed(
    () => appStore.getProjectConfig.useOpenBackTop,
  )

  const getShowSettingButton = computed(
    () => appStore.getProjectConfig.showSettingButton,
  )

  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)

  const getShowBreadCrumb = computed(
    () => appStore.getProjectConfig.showBreadCrumb,
  )

  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor)

  const getShowBreadCrumbIcon = computed(
    () => appStore.getProjectConfig.showBreadCrumbIcon,
  )

  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)

  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak)

  const getGrayMode = computed(() => appStore.getProjectConfig.grayMode)

  const getLockTime = computed(() => appStore.getProjectConfig.lockTime)

  const getShowDarkModeToggle = computed(
    () => appStore.getProjectConfig.showDarkModeToggle,
  )

  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentLayoutEnum.FULL
      ? ContentLayoutEnum.FULL
      : ContentLayoutEnum.FIXED,
  )
  // TODO 待实现
  // const getDarkMode = computed(() => appStore.getDarkMode)

  // TODO 待实现
  // function setRootSetting(setting: Partial<RootSetting>) {
  //   appStore.setProjectConfig(setting)
  // }
  // TODO 待实现
  // function setDarkMode(mode: ThemeEnum) {
  //   appStore.setDarkMode(mode)
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
