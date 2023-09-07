import type { MenuSetting } from '@vben/types'

import { computed, unref, ref } from 'vue'

// import { useConfigStoreWithOut } from '@/store/config'
import { useAppConfig } from '@vben/hooks'

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
} from '@vben/constants'
import { useFullContent } from '@/hooks/web/useFullContent'
import { useRootSetting } from '@vben/hooks'

const mixSideHasChildren = ref(false)

// todo src/hooks 在往 @VBen\hooks 转移
export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const configStore = useAppConfig()
  // const useAppConfigStore = appConfigStore()
  const { getShowLogo } = useRootSetting()
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) &&
        unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
        !unref(fullContent))
    )
  })

  const getCollapsed = computed(() => false)

  const getMenuType = computed(() => 'sidebar')

  const getMenuMode = computed(() => configStore.menu.mode)

  const getMenuFixed = computed(() => true)

  const getShowMenu = computed(() => true)

  const getMenuHidden = computed(() => false)

  const getMenuWidth = computed(() => 210)

  const getTrigger = computed(() => 'HEADER')

  const getMenuTheme = computed(() => 'dark')

  const getSplit = computed(() => configStore.menu.split)

  const getMenuBgColor = computed(() => '#001529')

  const getMixSideTrigger = computed(
    () => configStore.menu.mixSideTrigger,
  )

  const getCanDrag = computed(() => configStore.menu.canDrag)

  const getAccordion = computed(() => configStore.menu.accordion)

  const getMixSideFixed = computed(() => configStore.menu.mixSideFixed)

  const getTopMenuAlign = computed(() => configStore.menu.topMenuAlign)

  const getCloseMixSidebarOnChange = computed(
    () => false,
  )

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR,
  )

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU,
  )

  const getMenuShowLogo = computed(
    () => unref(getShowLogo) && unref(getIsSidebarType),
  )

  const getCollapsedShowTitle = computed(
    () => configStore.menu.collapsedShowTitle,
  )

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit)
  })

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false
    }

    return unref(getTrigger) === TriggerEnum.HEADER
  })

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })

  const getIsMixMode = computed(() => {
    return (
      unref(getMenuMode) === MenuModeEnum.INLINE &&
      unref(getMenuType) === MenuTypeEnum.MIX
    )
  })

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = configStore.menu
    return collapsedShowTitle
      ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
      : SIDE_BAR_MINI_WIDTH
  })

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) ||
      !unref(getShowMenu) ||
      (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed)
            ? SIDE_BAR_MINI_WIDTH
            : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren)
            ? unref(getRealWidth)
            : 0)
        : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    configStore.setAppConfig({ menu: menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
    getMenuShowLogo,
  }
}
