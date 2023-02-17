import {
  StoreGeneric,
  storeToRefs,
  useAppConfig as appConfigStore,
} from '@vben/stores'
import { DefineAppConfigOptions } from '@vben/types'
import { HandlerSettingEnum, ThemeEnum } from '@vben/constants'
import { _merge } from '@vben/utils'
import { computed, reactive, unref } from 'vue'
import { useClipboard, _omit } from '@vben/utils'
import { useAppTheme } from '@/web'

type DefineAppConfigStoreGetters = {
  isSidebar: boolean
  isTopMenu: boolean
  isMixSidebar: boolean
  isMix: boolean
  isMixMode: boolean
  isHorizontal: boolean
}
export const useAppConfig = () => {
  const useAppConfigStore = appConfigStore()
  const appConfigOptions = storeToRefs(
    useAppConfigStore as StoreGeneric,
  ) as unknown as DefineAppConfigOptions & DefineAppConfigStoreGetters
  const { openSettingDrawer, sidebar, menu, isMixSidebar } = appConfigOptions
  const setAppConfig = (configs: DeepPartial<DefineAppConfigOptions>) => {
    useAppConfigStore.$patch((state) => {
      _merge(state, configs)
    })
  }

  function toggleOpenSettingDrawer() {
    useAppConfigStore.setOpenSettingDrawer(!unref(openSettingDrawer))
  }

  function toggleCollapse() {
    useAppConfigStore.setSidebar({ collapsed: !unref(sidebar).collapsed })
  }

  function toggleMenuFixed() {
    useAppConfigStore.setMenu({ mixSideFixed: !unref(menu).mixSideFixed })
  }

  function baseHandler(event: HandlerSettingEnum, value: any) {
    setAppConfig(handlerResults(event, value, appConfigOptions))
  }

  async function copyConfigs() {
    try {
      const { copy, isSupported } = useClipboard()
      if (!isSupported)
        return console.error('Your browser does not support Clipboard API')
      const source = reactive(_omit(appConfigOptions, ['openSettingDrawer']))
      await copy(JSON.stringify(source))
    } catch (e) {
      console.error(e)
    }
  }

  function clearAndRedo() {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  }

  function resetAllConfig() {
    useAppConfigStore.$reset()
  }
  const getCollapsedShowTitle = computed<boolean>(() => {
    if (unref(isMixSidebar)) {
      return !unref(sidebar).collapsed
    }
    return unref(menu).collapsedShowTitle && unref(sidebar).collapsed
  })
  return {
    ...appConfigOptions,
    setAppConfig,
    toggleOpenSettingDrawer,
    baseHandler,
    copyConfigs,
    clearAndRedo,
    resetAllConfig,
    toggleCollapse,
    toggleMenuFixed,
    getCollapsedShowTitle,
  }
}

function handlerResults(
  event: HandlerSettingEnum,
  value: any,
  configOptions: DefineAppConfigOptions,
): DeepPartial<DefineAppConfigOptions> {
  const { themeColor, theme, sidebar, header } = configOptions
  switch (event) {
    case HandlerSettingEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value
      const splitOpt = split === undefined ? { split } : {}
      return {
        navBarMode: type,
        menu: {
          ...splitOpt,
          mode,
        },
      }

    case HandlerSettingEnum.CHANGE_THEME_COLOR:
      if (unref(themeColor) === value) {
        return {}
      }
      // changeTheme(value);
      return { themeColor: value }

    case HandlerSettingEnum.CHANGE_THEME:
      if (unref(theme) === value) {
        return {}
      }
      // updateDarkTheme(value);
      return { theme: value ? ThemeEnum.DARK : ThemeEnum.LIGHT }

    case HandlerSettingEnum.MENU_HAS_DRAG:
      return { menu: { canDrag: value } }

    case HandlerSettingEnum.MENU_ACCORDION:
      return { menu: { accordion: value } }

    case HandlerSettingEnum.MENU_TRIGGER:
      return { sidebar: { trigger: value } }

    case HandlerSettingEnum.MENU_TOP_ALIGN:
      return { menu: { topMenuAlign: value } }

    case HandlerSettingEnum.MENU_COLLAPSED:
      return { sidebar: { collapsed: value } }

    case HandlerSettingEnum.MENU_WIDTH:
      return { sidebar: { width: value } }

    case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
      return { sidebar: { show: value, visible: value } }

    case HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menu: { collapsedShowTitle: value } }

    case HandlerSettingEnum.MENU_THEME:
      // updateSidebarBgColor(value);
      if (unref(sidebar).bgColor === value) return {}
      return { sidebar: { bgColor: value } }

    case HandlerSettingEnum.MENU_SPLIT:
      return { menu: { split: value } }

    case HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      return { closeMixSidebarOnChange: value }

    case HandlerSettingEnum.MENU_FIXED:
      return { sidebar: { fixed: value } }

    case HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return { menu: { mixSideTrigger: value } }

    case HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR:
      return { menu: { mixSideFixed: value } }

    // ============transition==================
    case HandlerSettingEnum.OPEN_PAGE_LOADING:
      return { transition: { openPageLoading: value } }

    case HandlerSettingEnum.ROUTER_TRANSITION:
      return { transition: { basicTransition: value } }

    case HandlerSettingEnum.OPEN_ROUTE_TRANSITION:
      return { transition: { enable: value } }

    case HandlerSettingEnum.OPEN_PROGRESS:
      return { transition: { openNProgress: value } }
    // ============root==================

    case HandlerSettingEnum.LOCK_TIME:
      return { lockTime: value }

    case HandlerSettingEnum.FULL_CONTENT:
      return {
        content: { fullScreen: value },
        sidebar: { visible: !value, show: !value },
        header: { visible: !value, show: !value },
        tabTar: { visible: !value, show: !value },
      }

    case HandlerSettingEnum.CONTENT_MODE:
      return { content: { mode: value } }

    case HandlerSettingEnum.SHOW_BREADCRUMB:
      return { header: { showBreadCrumb: value } }

    case HandlerSettingEnum.SHOW_BREADCRUMB_ICON:
      return { header: { showBreadCrumbIcon: value } }

    case HandlerSettingEnum.GRAY_MODE:
      return { grayMode: value }

    case HandlerSettingEnum.SHOW_FOOTER:
      return { footer: { show: value, visible: value } }

    case HandlerSettingEnum.COLOR_WEAK:
      return { colorWeak: value }

    case HandlerSettingEnum.SHOW_LOGO:
      return { logo: { show: value, visible: value } }

    // ============tabs==================
    case HandlerSettingEnum.TABS_SHOW_QUICK:
      return { tabTar: { showQuick: value } }

    case HandlerSettingEnum.TABS_SHOW:
      return { tabTar: { show: value, visible: value } }

    case HandlerSettingEnum.TABS_SHOW_REDO:
      return { tabTar: { showRedo: value } }

    case HandlerSettingEnum.TABS_SHOW_FOLD:
      return { tabTar: { showFold: value } }

    // ============header==================
    case HandlerSettingEnum.HEADER_THEME:
      // updateHeaderBgColor(value);
      if (unref(header).bgColor === value) return {}
      return { header: { bgColor: value } }

    case HandlerSettingEnum.HEADER_SEARCH:
      return { header: { showSearch: value } }

    case HandlerSettingEnum.HEADER_FIXED:
      return { header: { fixed: value } }

    case HandlerSettingEnum.HEADER_SHOW:
      return { header: { show: value, visible: value } }
    default:
      return {}
  }
}
