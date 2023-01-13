import type { MenuSetting } from '@vben/types'

import { computed, unref, ref } from 'vue'

import { useConfigStoreWithOut } from '@/store/config'

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
} from '@vben/constants'
import { useFullContent } from '@/hooks/web/useFullContent'
import {useRootSetting} from "@/hooks/setting/useRootSetting";

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const configStore = useConfigStoreWithOut()
  const { getShowLogo } = useRootSetting()
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) &&
        unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
        !unref(fullContent))
    )
  })

  const getCollapsed = computed(() => configStore.getMenuSetting.collapsed)

  const getMenuType = computed(() => configStore.getMenuSetting.type)

  const getMenuMode = computed(() => configStore.getMenuSetting.mode)

  const getMenuFixed = computed(() => configStore.getMenuSetting.fixed)

  const getShowMenu = computed(() => configStore.getMenuSetting.show)

  const getMenuHidden = computed(() => configStore.getMenuSetting.hidden)

  const getMenuWidth = computed(() => configStore.getMenuSetting.menuWidth)

  const getTrigger = computed(() => configStore.getMenuSetting.trigger)

  const getMenuTheme = computed(() => configStore.getMenuSetting.theme)

  const getSplit = computed(() => configStore.getMenuSetting.split)

  const getMenuBgColor = computed(() => configStore.getMenuSetting.bgColor)

  const getMixSideTrigger = computed(
    () => configStore.getMenuSetting.mixSideTrigger,
  )

  const getCanDrag = computed(() => configStore.getMenuSetting.canDrag)

  const getAccordion = computed(() => configStore.getMenuSetting.accordion)

  const getMixSideFixed = computed(
    () => configStore.getMenuSetting.mixSideFixed,
  )

  const getTopMenuAlign = computed(
    () => configStore.getMenuSetting.topMenuAlign,
  )

  const getCloseMixSidebarOnChange = computed(
    () => configStore.getMenuSetting.closeMixSidebarOnChange,
  )

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR,
  )

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU,
  )

  const getMenuShowLogo = computed(
    ()=> unref(getShowLogo) && unref(getIsSidebarType)
  )

  const getCollapsedShowTitle = computed(
    () => configStore.getMenuSetting.collapsedShowTitle,
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
    const { collapsedShowTitle } = configStore.getMenuSetting
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
    configStore.setProjectConfig({ menuSetting })
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
    getMenuShowLogo
  }
}
