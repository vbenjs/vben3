import { useCssVar, MaybeElementRef } from '@vben/utils'
import { useAppConfig } from '../config'
import { unref, watchEffect } from 'vue'

export const useGridLayoutContainerElStyle = (el: MaybeElementRef | null) => {
  const {
    isTopMenu,
    isMixSidebar,
    sidebar,
    header,
    footer,
    tabTar,
    grayMode,
    colorWeak,
    toggleGrayMode,
    toggleColorWeak,
  } = useAppConfig()
  const asideWidth = useCssVar('--aside-width', el, {
    initialValue: `${unref(sidebar).width}px`,
  })
  const headerHeight = useCssVar('--header-height', el, {
    initialValue: `${unref(header).height}px`,
  })
  const tabBarHeight = useCssVar('--tab-bar-height', el, {
    initialValue: `${unref(tabTar).height}px`,
  })
  const footerHeight = useCssVar('--footer-height', el, {
    initialValue: `${unref(footer).height}px`,
  })

  watchEffect(() => {
    const getAsideWidth = () => {
      if (unref(isTopMenu) || !unref(sidebar).visible) return 0
      if (unref(sidebar).collapsed) return unref(sidebar).collapsedWidth
      if (unref(isMixSidebar)) return unref(sidebar).mixSidebarWidth
      return unref(sidebar).width
    }

    const getHeaderHeight = () => {
      if (!unref(header).visible) return 0
      return unref(header).height
    }

    const getTabBarHeight = () => {
      if (!unref(tabTar).visible) return 0
      return unref(tabTar).height
    }

    const getFooterHeight = () => {
      if (!unref(footer).visible) return 0
      return unref(footer).height
    }
    asideWidth.value = `${getAsideWidth()}px`
    headerHeight.value = `${getHeaderHeight()}px`
    tabBarHeight.value = `${getTabBarHeight()}px`
    footerHeight.value = `${getFooterHeight()}px`
    toggleGrayMode(unref(grayMode))
    toggleColorWeak(unref(colorWeak))
  })

  return {}
}
