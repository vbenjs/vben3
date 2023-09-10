import type { MenuSetting } from '@vben/types'

import { computed, unref, ref } from 'vue'

import { useAppConfig } from '../config'

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
} from '@vben/constants'
import { useRootSetting } from './useRootSetting'
import { useFullContent } from '../web'

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const configStore = useAppConfig()
  const { getShowLogo } = useRootSetting()
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) &&
        unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
        !unref(fullContent))
    )
  })

  // TODO
  const getCollapsed = computed(() => false)

  // TODO
  const getMenuType = computed(() => 'sidebar')

  const getMenuMode = computed(() => configStore.menu.value.mode)

  // TODO
  const getMenuFixed = computed(() => true)

  // TODO
  const getShowMenu = computed(() => true)

  // TODO
  const getMenuHidden = computed(() => false)

  const getMenuWidth = computed(() => configStore.sidebar.value.width)

  const getTrigger = computed(() => configStore.sidebar.value.trigger)

  const getMenuTheme = computed(() => configStore.sidebar.value.theme)

  const getSplit = computed(() => configStore.menu.value.split)

  const getMenuBgColor = computed(() => configStore.sidebar.value.bgColor)

  const getMixSideTrigger = computed(() => configStore.menu.value.mixSideTrigger)

  const getCanDrag = computed(() => configStore.menu.value.canDrag)

  const getAccordion = computed(() => configStore.menu.value.accordion)

  const getMixSideFixed = computed(() => configStore.menu.value.mixSideFixed)

  const getTopMenuAlign = computed(() => configStore.menu.value.topMenuAlign)

  const getCloseMixSidebarOnChange = computed(
    () => configStore.closeMixSidebarOnChange.value,
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
    () => configStore.menu.value.collapsedShowTitle,
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
    const { collapsedShowTitle } = configStore.menu.value
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
