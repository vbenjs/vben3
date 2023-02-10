import { useAppConfig } from '../config'
import { unref, watchEffect } from 'vue'
import { useLayoutHeader, useLayoutSidebar } from '@vben/stores'
import {
  useCssVar,
  MaybeElementRef,
  lighten,
  pickTextColorBasedOnBgColor,
  darken,
  addClass,
} from '@vben/utils'

const HEADER_HEIGHT = '--header-height'
const HEADER_BG_COLOR_VAR = '--header-background-color'
const HEADER_TEXT_COLOR_VAR = '--header-text-color'
const HEADER_ACTION_HOVER_BG_COLOR_VAR = '--header-action-hover-bg-color'

const ASIDE_WIDTH = '--aside-width'
const ASIDE_DARK_BG_COLOR = '--aside-background-color'
const ASIDE_TEXT_COLOR_VAR = '--aside-text-color'

const TAB_BAR_HEIGHT = '--tab-bar-height'

const FOOTER_HEIGHT = '--footer-height'

const LIGHT_TEXT_COLOR = 'rgba(0,0,0,.85)'
const DARK_TEXT_COLOR = '#fff'

export function createThemeColorListen(el: MaybeElementRef | null) {
  const {
    sidebar,
    header,
    grayMode,
    colorWeak,
    theme,
    toggleGrayMode,
    toggleColorWeak,
  } = useAppConfig()

  const { sidebarRef } = useLayoutSidebar()
  const { headerRef } = useLayoutHeader()

  const headerBgColor = useCssVar(
    HEADER_BG_COLOR_VAR,
    headerRef as MaybeElementRef,
    {
      initialValue: `${unref(header).bgColor}px`,
    },
  )

  const headerTextColor = useCssVar(
    HEADER_TEXT_COLOR_VAR,
    headerRef as MaybeElementRef,
    {
      initialValue: LIGHT_TEXT_COLOR,
    },
  )
  const headerActionHoverBgColor = useCssVar(
    HEADER_ACTION_HOVER_BG_COLOR_VAR,
    headerRef as MaybeElementRef,
  )

  const sidebarBgColor = useCssVar(
    ASIDE_DARK_BG_COLOR,
    sidebarRef as MaybeElementRef,
    {
      initialValue: `${unref(sidebar).bgColor}px`,
    },
  )

  const asideTextColor = useCssVar(
    ASIDE_TEXT_COLOR_VAR,
    sidebarRef as MaybeElementRef,
    {
      initialValue: LIGHT_TEXT_COLOR,
    },
  )

  watchEffect(() => {
    headerBgColor.value = unref(header).bgColor
    headerTextColor.value = pickTextColorBasedOnBgColor(
      unref(header).bgColor,
      LIGHT_TEXT_COLOR,
      DARK_TEXT_COLOR,
    )
    headerActionHoverBgColor.value = ['#fff', '#ffffff'].includes(
      unref(header).bgColor.toLowerCase(),
    )
      ? darken(unref(header).bgColor, 6)
      : lighten(unref(header).bgColor, 6)

    sidebarBgColor.value = unref(sidebar).bgColor
    asideTextColor.value = pickTextColorBasedOnBgColor(
      unref(sidebar).bgColor,
      LIGHT_TEXT_COLOR,
      DARK_TEXT_COLOR,
    )
    toggleGrayMode(unref(grayMode))
    toggleColorWeak(unref(colorWeak))
    addClass(document.documentElement, unref(theme))
  })
}

export function createGridLayoutListen(el: MaybeElementRef | null) {
  const { isTopMenu, isMixSidebar, sidebar, header, footer, tabTar } =
    useAppConfig()
  const asideWidth = useCssVar(ASIDE_WIDTH, el, {
    initialValue: `${unref(sidebar).width}px`,
  })
  const headerHeight = useCssVar(HEADER_HEIGHT, el, {
    initialValue: `${unref(header).height}px`,
  })
  const tabBarHeight = useCssVar(TAB_BAR_HEIGHT, el, {
    initialValue: `${unref(tabTar).height}px`,
  })
  const footerHeight = useCssVar(FOOTER_HEIGHT, el, {
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
  })
}
