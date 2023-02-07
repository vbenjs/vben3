import { HandlerSettingEnum } from '@vben/constants'
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useMultiTabsSettingStore,
  useSporadicSettingStore,
  useTransitionSettingStore,
} from '../store'
import { storeToRefs } from '@vben/pinia'
import { reactive } from 'vue'
import { useClipboard } from '@vben/utils'

export const useHandler = () => {
  const sporadicSettingStore = useSporadicSettingStore()
  const menuSettingStore = useMenuSettingStore()
  const headerSettingStore = useHeaderSettingStore()
  const multiTabsSettingStore = useMultiTabsSettingStore()
  const transitionSettingStore = useTransitionSettingStore()

  function copySetting() {
    try {
      const { copy, isSupported } = useClipboard()
      if (!isSupported)
        return console.error('Your browser does not support Clipboard API')
      const source = reactive({
        SporadicSetting: storeToRefs(sporadicSettingStore),
        MenuSetting: storeToRefs(menuSettingStore),
        HeaderSetting: storeToRefs(headerSettingStore),
        MultiTabsSetting: storeToRefs(multiTabsSettingStore),
        TransitionSetting: storeToRefs(transitionSettingStore),
      })
      copy(JSON.stringify(source))
    } catch (e) {
      console.error(e)
    }
  }

  const resetSetting = () => {
    sporadicSettingStore.$reset()
    menuSettingStore.$reset()
    headerSettingStore.$reset()
    multiTabsSettingStore.$reset()
    transitionSettingStore.$reset()
  }

  const clearAndRedo = () => {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  }
  function baseHandler(event: HandlerSettingEnum, value: any) {
    switch (event) {
      case HandlerSettingEnum.CHANGE_LAYOUT:
        const { mode, type, split } = value
        menuSettingStore.setType(type)
        menuSettingStore.setMode(mode)
        menuSettingStore.setSplit(split)
        break

      case HandlerSettingEnum.CHANGE_THEME_COLOR:
        // if (getThemeColor.value === value) {
        //   return {}
        // }
        // changeTheme(value);
        sporadicSettingStore.setThemeColor(value)
        break

      case HandlerSettingEnum.CHANGE_THEME:
        // if (getDarkMode.value === value) {
        //   return {}
        // }
        // updateDarkTheme(value);
        break

      case HandlerSettingEnum.MENU_HAS_DRAG:
        menuSettingStore.setCanDrag(value)
        break

      case HandlerSettingEnum.MENU_ACCORDION:
        menuSettingStore.setAccordion(value)
        break

      case HandlerSettingEnum.MENU_TRIGGER:
        menuSettingStore.setTrigger(value)
        break

      case HandlerSettingEnum.MENU_TOP_ALIGN:
        menuSettingStore.setTopMenuAlign(value)
        break
      case HandlerSettingEnum.MENU_COLLAPSED:
        menuSettingStore.setCollapsed(value)
        break

      case HandlerSettingEnum.MENU_WIDTH:
        return { menuSetting: { menuWidth: value } }

      case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
        menuSettingStore.setShow(value)
        break

      case HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE:
        return { menuSetting: { collapsedShowTitle: value } }

      case HandlerSettingEnum.MENU_THEME:
        // updateSidebarBgColor(value);
        menuSettingStore.setBgColor(value)
        break

      case HandlerSettingEnum.MENU_SPLIT:
        menuSettingStore.setSplit(value)
        break

      case HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
        menuSettingStore.setCloseMixSidebarOnChange(value)
        break

      case HandlerSettingEnum.MENU_FIXED:
        menuSettingStore.setFixed(value)
        break

      case HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR:
        menuSettingStore.setMixSideTrigger(value)
        break

      case HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR:
        menuSettingStore.setMixSideFixed(value)
        break

      // ============transition==================
      case HandlerSettingEnum.OPEN_PAGE_LOADING:
        transitionSettingStore.setOpenPageLoading(value)
        break

      case HandlerSettingEnum.ROUTER_TRANSITION:
        transitionSettingStore.setBasicTransition(value)
        break

      case HandlerSettingEnum.OPEN_ROUTE_TRANSITION:
        transitionSettingStore.setEnable(value)
        break

      case HandlerSettingEnum.OPEN_PROGRESS:
        transitionSettingStore.setOpenNProgress(value)
        break
      // ============sporadic==================

      case HandlerSettingEnum.LOCK_TIME:
        sporadicSettingStore.setLockTime(value)
        break

      case HandlerSettingEnum.FULL_CONTENT:
        sporadicSettingStore.setFullContent(value)
        break
      case HandlerSettingEnum.CONTENT_MODE:
        sporadicSettingStore.setContentMode(value)
        break

      case HandlerSettingEnum.SHOW_BREADCRUMB:
        sporadicSettingStore.setShowBreadCrumb(value)
        break
      case HandlerSettingEnum.SHOW_BREADCRUMB_ICON:
        sporadicSettingStore.setShowBreadCrumbIcon(value)
        break

      case HandlerSettingEnum.GRAY_MODE:
        // updateGrayMode(value)
        sporadicSettingStore.setGrayMode(value)
        break
      case HandlerSettingEnum.SHOW_FOOTER:
        sporadicSettingStore.setShowFooter(value)
        break

      case HandlerSettingEnum.COLOR_WEAK:
        // updateColorWeak(value)
        sporadicSettingStore.setColorWeak(value)
        break

      case HandlerSettingEnum.SHOW_LOGO:
        sporadicSettingStore.setShowLogo(value)
        break

      // ============tabs==================
      case HandlerSettingEnum.TABS_SHOW_QUICK:
        multiTabsSettingStore.setShowQuick(value)
        break
      case HandlerSettingEnum.TABS_SHOW:
        multiTabsSettingStore.setShow(value)
        break

      case HandlerSettingEnum.TABS_SHOW_REDO:
        multiTabsSettingStore.setShowRedo(value)
        break

      case HandlerSettingEnum.TABS_SHOW_FOLD:
        multiTabsSettingStore.setShowFold(value)
        break

      // ============header==================
      case HandlerSettingEnum.HEADER_THEME:
        // updateHeaderBgColor(value);
        headerSettingStore.setBgColor(value)
        break

      case HandlerSettingEnum.HEADER_SEARCH:
        headerSettingStore.setShowSearch(value)
        break
      case HandlerSettingEnum.HEADER_FIXED:
        headerSettingStore.setFixed(value)
        break
      case HandlerSettingEnum.HEADER_SHOW:
        headerSettingStore.setShow(value)
        break
      default:
        return
    }
  }

  return {
    copySetting,
    resetSetting,
    clearAndRedo,
    baseHandler,
  }
}
