import type { HeaderSetting } from '@vben/types'

import { computed, unref } from 'vue'

// import { useConfigStoreWithOut } from '@/store/config'
import { useAppConfig } from '@vben/hooks'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@vben/hooks'
import { useFullContent } from '@/hooks/web/useFullContent'
import { MenuModeEnum } from '@vben/constants'

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

  const getShowDoc = computed(() => configStore.header.showDoc)

  const getHeaderTheme = computed(() => configStore.header.theme)

  const getShowHeader = computed(() => configStore.header.show)

  const getFixed = computed(() => configStore.header.fixed)

  const getHeaderBgColor = computed(() => configStore.header.bgColor)

  const getShowSearch = computed(() => configStore.header.showSearch)

  const getUseLockPage = computed(() => false)

  const getShowFullScreen = computed(() => configStore.header.showFullScreen)
  const getShowLocalePicker = computed(
    () => configStore.header.showLocalePicker,
  )

  const getShowNotice = computed(() => configStore.header.showNotice)

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
