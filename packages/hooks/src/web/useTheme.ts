import { useAppConfig } from '../config'
import { HandlerSettingEnum, ThemeEnum } from '@vben/constants'
import { useEventListener } from '@vben/utils'
import { computed, unref } from 'vue'

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
  return { isDark, theme, toggleTheme }
}
