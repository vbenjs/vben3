import { useAppConfig } from '../config'
import { HandlerSettingEnum, ThemeEnum } from '@vben/constants'
import { generateColors, setCssVar, useEventListener } from '@vben/utils'
import { computed, unref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { ThemeColorConfig, useThemeStore } from '@vben/stores'

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
  const themeStore = useThemeStore()
  const { setTheme, setThemeConfig } = themeStore
  const { getTheme, getThemeConfig } = storeToRefs(themeStore)

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

  //TODO remove it
  const themeColor = computed(() => {
    return ''
  })

  const themeColors = computed(() => {
    const colorPrimaryList = generateColors(getThemeConfig.value.colorPrimary)
    const primaryColorSet = {
      primaryColor: colorPrimaryList[5],
      primaryColorHover: colorPrimaryList[4],
      primaryColorPressed: colorPrimaryList[4],
      primaryColorSuppl: colorPrimaryList[6],
    }

    const colorInfoList = generateColors(getThemeConfig.value.colorInfo)
    const infoColorSet = {
      infoColor: colorInfoList[5],
      infoColorHover: colorInfoList[4],
      infoColorPressed: colorInfoList[4],
      infoColorSuppl: colorInfoList[6],
    }

    const colorSuccessList = generateColors(getThemeConfig.value.colorSuccess)
    const successColorSet = {
      successColor: colorSuccessList[5],
      successColorHover: colorSuccessList[4],
      successColorPressed: colorSuccessList[4],
      successColorSuppl: colorSuccessList[6],
    }

    const colorWarningList = generateColors(getThemeConfig.value.colorWarning)
    const warningColorSet = {
      warningColor: colorWarningList[5],
      warningColorHover: colorWarningList[4],
      warningColorPressed: colorWarningList[4],
      warningColorSuppl: colorWarningList[6],
    }

    const colorErrorList = generateColors(getThemeConfig.value.colorError)
    const errorColorSet = {
      errorColor: colorErrorList[5],
      errorColorHover: colorErrorList[4],
      errorColorPressed: colorErrorList[4],
      errorColorSuppl: colorErrorList[6],
    }

    return {
      ...primaryColorSet,
      ...infoColorSet,
      ...successColorSet,
      ...warningColorSet,
      ...errorColorSet,
    }
  })

  watch(
    themeColors,
    (val) => {
      setCssVar('--primary-color', val.primaryColor)
      setCssVar('--success-color', val.successColor)
      setCssVar('--error-color', val.errorColor)
      setCssVar('--warning-color', val.warningColor)
    },
    { deep: true },
  )

  // todo 组件依赖
  const themeProp = computed(() => {
    //import { darkTheme } from 'naive-ui'
    return unref(isDark) ? null : null
  })

  const themeOverrides = computed(() => {
    return {
      themeOverrides: {
        common: {
          ...themeColors.value,
        },
      },
    }
  })

  return { isDark, theme: themeProp, toggleTheme, themeColor, themeOverrides }
}
