import type { HeaderSetting } from '@vben/types'

import { computed, unref } from 'vue'

import { useConfigStoreWithOut } from '@/store/config'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useFullContent } from '@/hooks/web/useFullContent'
import { MenuModeEnum } from '@vben/constants'

export function useHeaderSetting() {
  const { getFullContent } = useFullContent()
  const configStore = useConfigStoreWithOut()

  const getShowFullHeaderRef = computed(() => {
    return (
      (!unref(getFullContent) &&
        unref(getShowHeader)) ||
      unref(getIsTopMenu)
    )
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

  const getShowDoc = computed(() => configStore.getHeaderSetting.showDoc)

  const getHeaderTheme = computed(() => configStore.getHeaderSetting.theme)

  const getShowHeader = computed(() => configStore.getHeaderSetting.show)

  const getFixed = computed(() => configStore.getHeaderSetting.fixed)

  const getHeaderBgColor = computed(() => configStore.getHeaderSetting.bgColor)

  const getShowSearch = computed(() => configStore.getHeaderSetting.showSearch)

  const getUseLockPage = computed(() => configStore.getHeaderSetting.useLockPage)

  const getShowFullScreen = computed(
    () => configStore.getHeaderSetting.showFullScreen,
  )
  const getShowLocalePicker = computed(
    () => configStore.getHeaderSetting.showLocalePicker,
  )

  const getShowNotice = computed(() => configStore.getHeaderSetting.showNotice)

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
    configStore.setProjectConfig({ headerSetting })
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
