import { useAppConfig } from '../config'
import { HandlerSettingEnum, ThemeEnum } from '@vben/constants'
import { useEventListener } from '@vben/utils'
import { computed, unref } from 'vue'
import { useThemeStore } from '@vben/stores'

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

export const useAppTheme = () => {
  const { getTheme, getThemeConfig } = useThemeStore()
  const { theme, baseHandler } = useAppConfig()

  const isDark = computed(() => {
    return unref(theme) === ThemeEnum.DARK
  })
  const toggleTheme = (dark: boolean) => {
    baseHandler(
      HandlerSettingEnum.CHANGE_THEME,
      dark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    )
  }

  const themeColor = computed(() => {
    return themeConfig.colorPrimary
  })

  const themeOverrides = computed(() => {
    return {
      theme: 'default',
      themeOverrides: {
        common: {
          primaryColor: '#ff0000',
        },
      },
    }
  })

  return { isDark, theme, toggleTheme, themeColor, themeOverrides }
}
