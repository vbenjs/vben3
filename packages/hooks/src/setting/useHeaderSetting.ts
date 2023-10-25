import type { HeaderSetting } from '@vben/types'

import { computed, unref } from 'vue'

import { MenuModeEnum } from '@vben/constants'

import {
  useAppConfig,
  useFullContent,
  useRootSetting,
  useMenuSetting,
} from '..'

export function useHeaderSetting() {
  const { getFullContent } = useFullContent()
  const configStore = useAppConfig()

  const getShowFullHeaderRef = computed(() => {
    return !unref(getFullContent) && unref(getShowHeader)
  })

  const getUnFixedAndFull = computed(
    () => !unref(getFixed) && !unref(getShowFullHeaderRef),
  )

  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader)
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    )
  })

  const {
    getMenuMode,
    getSplit,
    getShowHeaderTrigger,
    getIsSidebarType,
    getIsMixSidebar,
    getIsTopMenu,
  } = useMenuSetting()
  const { getShowBreadCrumb, getShowLogo } = useRootSetting()

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader),
  )

  const getShowDoc = computed(() => configStore.header.value.showDoc)

  const getHeaderTheme = computed(() => configStore.header.value.theme)

  const getShowHeader = computed(() => configStore.header.value.show)

  const getFixed = computed(() => configStore.header.value.fixed)

  const getHeaderBgColor = computed(() => configStore.header.value.bgColor)

  const getShowSearch = computed(() => configStore.header.value.showSearch)

  const getUseLockPage = computed(() => false)

  const getShowFullScreen = computed(
    () => configStore.header.value.showFullScreen,
  )
  const getShowLocalePicker = computed(
    () => configStore.header.value.showLocalePicker,
  )

  const getShowNotice = computed(() => configStore.header.value.showNotice)

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
      unref(getShowBreadCrumb) &&
      !unref(getSplit)
    )
  })

  const getShowHeaderLogo = computed(() => {
    return (
      unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar)
    )
  })

  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger)
  })

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    configStore.setAppConfig({ header: headerSetting })
  }
  return {
    setHeaderSetting,
    getShowDoc,
    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull,
    getHeaderBgColor,
    getShowLocalePicker,
  }
}
