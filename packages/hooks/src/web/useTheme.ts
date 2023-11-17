import { useAppConfig } from '../config'
import { ThemeEnum } from '@vben/constants'
import { generateColors, setCssVar, useEventListener } from '@vben/utils'
import { computed, unref, watch } from 'vue'
import { useThemeStore, storeToRefs } from '@vben/stores'

export function createMediaPrefersColorSchemeListen() {
  const { setAppConfig } = useAppConfig()
  // 监听系统主题
  useEventListener(
    window.matchMedia('(prefers-color-scheme: dark)'),
    'change',
    (e: MediaQueryListEvent) => {
      setAppConfig({ theme: e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT })
    },
  )
}

export interface ThemeColors {
  primaryColor?: string
  primaryColorHover?: string
  primaryColorPressed?: string
  primaryColorSuppl?: string
  infoColor?: string
  infoColorHover?: string
  infoColorPressed?: string
  infoColorSuppl?: string
  successColor?: string
  successColorHover?: string
  successColorPressed?: string
  successColorSuppl?: string
  warningColor?: string
  warningColorHover?: string
  warningColorPressed?: string
  warningColorSuppl?: string
  errorColor?: string
  errorColorHover?: string
  errorColorPressed?: string
  errorColorSuppl?: string
}

export const useAppTheme = () => {
  const themeStore = useThemeStore()
  const { setTheme, setThemeConfig, setSidebarTheme } = themeStore
  const { getTheme, getThemeConfig, getSidebarTheme, getHeaderTheme } =
    storeToRefs(themeStore)

  const isDark = computed(() => {
    return unref(getTheme) === ThemeEnum.DARK
  })

  const isSidebarDark = computed(() => {
    return (
      unref(getTheme) === ThemeEnum.DARK ||
      unref(getSidebarTheme) === ThemeEnum.DARK
    )
  })

  const isHeaderDark = computed(() => {
    return (
      unref(getTheme) === ThemeEnum.DARK ||
      unref(getHeaderTheme) === ThemeEnum.DARK
    )
  })

  const toggleTheme = (dark: boolean) => {
    setTheme(dark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
  }

  const toggleSidebarTheme = (dark: boolean) => {
    setSidebarTheme(dark ? ThemeEnum.DARK : ThemeEnum.LIGHT)
  }

  const primaryColor = computed(() => {
    return getThemeConfig.value.primaryColor
  })

  const infoColor = computed(() => {
    return getThemeConfig.value.infoColor
  })

  const successColor = computed(() => {
    return getThemeConfig.value.successColor
  })

  const warningColor = computed(() => {
    return getThemeConfig.value.warningColor
  })

  const errorColor = computed(() => {
    return getThemeConfig.value.errorColor
  })

  const themeColors = computed(() => {
    let colors: ThemeColors = {}
    const themeConfig = getThemeConfig.value

    if (themeConfig.primaryColor) {
      const primaryColorList = generateColors(themeConfig.primaryColor)
      colors = {
        ...colors,
        ...{
          primaryColor: primaryColorList[5],
          primaryColorHover: primaryColorList[4],
          primaryColorPressed: primaryColorList[4],
          primaryColorSuppl: primaryColorList[6],
        },
      }
    }

    if (themeConfig.infoColor) {
      const infoColorList = generateColors(themeConfig.infoColor)
      colors = {
        ...colors,
        ...{
          infoColor: infoColorList[5],
          infoColorHover: infoColorList[4],
          infoColorPressed: infoColorList[4],
          infoColorSuppl: infoColorList[6],
        },
      }
    }

    if (themeConfig.successColor) {
      const successColorList = generateColors(themeConfig.successColor)
      colors = {
        ...colors,
        ...{
          successColor: successColorList[5],
          successColorHover: successColorList[4],
          successColorPressed: successColorList[4],
          successColorSuppl: successColorList[6],
        },
      }
    }

    if (themeConfig.warningColor) {
      const warningColorList = generateColors(themeConfig.warningColor)
      colors = {
        ...colors,
        ...{
          warningColor: warningColorList[5],
          warningColorHover: warningColorList[4],
          warningColorPressed: warningColorList[4],
          warningColorSuppl: warningColorList[6],
        },
      }
    }

    if (themeConfig.errorColor) {
      const errorColorList = generateColors(themeConfig.errorColor)
      colors = {
        ...colors,
        ...{
          errorColor: errorColorList[5],
          errorColorHover: errorColorList[4],
          errorColorPressed: errorColorList[4],
          errorColorSuppl: errorColorList[6],
        },
      }
    }
    return colors
  })

  watch(
    themeColors,
    (val) => {
      val.primaryColor && setCssVar('--primary-color', val.primaryColor)
      val.successColor && setCssVar('--success-color', val.successColor)
      val.errorColor && setCssVar('--error-color', val.errorColor)
      val.warningColor && setCssVar('--warning-color', val.warningColor)
    },
    { deep: true },
  )

  return {
    isDark,
    isSidebarDark,
    isHeaderDark,
    toggleTheme,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    themeColors,
    setThemeConfig,
    toggleSidebarTheme,
  }
}
