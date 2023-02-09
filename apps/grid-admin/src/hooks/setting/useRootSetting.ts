// import type { ProjectConfig } from '@/types'
import { computed } from 'vue'
import { useConfigStoreWithOut } from '@/store/config'
import { useAppStoreWithOut } from '@/store/modules/app'
import { ContentLayoutEnum } from '@vben/constants'

// type RootSetting = Omit<
//   ProjectConfig,
//   'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
// >

export function useRootSetting() {

  const configStore = useConfigStoreWithOut()
  const appStore = useAppStoreWithOut()

  const getPageLoading = computed(() => appStore.getPageLoading)

  const getOpenKeepAlive = computed(
    () => configStore.getProjectConfig.openKeepAlive,
  )

  const getSettingButtonPosition = computed(
    () => configStore.getProjectConfig.settingButtonPosition,
  )

  const getCanEmbedIFramePage = computed(
    () => configStore.getProjectConfig.canEmbedIFramePage,
  )

  const getPermissionMode = computed(
    () => configStore.getProjectConfig.permissionMode,
  )

  const getShowLogo = computed(() => configStore.getProjectConfig.showLogo)

  const getContentMode = computed(() => configStore.getProjectConfig.contentMode)

  const getUseOpenBackTop = computed(
    () => configStore.getProjectConfig.useOpenBackTop,
  )

  const getShowSettingButton = computed(
    () => configStore.getProjectConfig.showSettingButton,
  )

  const getShowFooter = computed(() => configStore.getProjectConfig.showFooter)

  const getShowBreadCrumb = computed(
    () => configStore.getProjectConfig.showBreadCrumb,
  )

  const getThemeColor = computed(() => configStore.getProjectConfig.themeColor)

  const getShowBreadCrumbIcon = computed(
    () => configStore.getProjectConfig.showBreadCrumbIcon,
  )

  const getFullContent = computed(() => configStore.getProjectConfig.fullContent)

  const getColorWeak = computed(() => configStore.getProjectConfig.colorWeak)

  const getGrayMode = computed(() => configStore.getProjectConfig.grayMode)

  const getLockTime = computed(() => configStore.getProjectConfig.lockTime)

  const getShowDarkModeToggle = computed(
    () => configStore.getProjectConfig.showDarkModeToggle,
  )

  const getLayoutContentMode = computed(() =>
    configStore.getProjectConfig.contentMode === ContentLayoutEnum.FULL
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
