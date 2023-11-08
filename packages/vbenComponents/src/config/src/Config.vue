<script lang="ts" setup name="VbenConfig">
import { maps } from '#/index'
import { computed, unref } from 'vue'
import { useAppTheme } from '@vben/hooks'
import { ThemeEnum } from '@vben/constants'
import { generate } from '@ant-design/colors'
import { setCssVar } from '@vben/utils'

const Config = maps.get('Config')
const darkTheme = maps.get('DarkTheme')

const props = defineProps({
  // Customize the configuration theme mode
  themeMode: {
    type: String,
    default: 'dark',
  },
  // Whether to inherit the theme
  inherit: {
    type: Boolean,
    default: true,
  },
})
const { isDark } = useAppTheme()
const appTheme = computed(() => {
  if (!props.inherit) {
    return props.themeMode === ThemeEnum.DARK ? darkTheme : null
  }
  return unref(isDark) ? darkTheme : null
})

const colorPrimary = '#2a64d4'
const colorPrimaryList = generate(colorPrimary)
const colorSuccess = '#52c41a'
const colorSuccessList = generate(colorSuccess)
const colorWarning = '#faad14'
const colorWarningList = generate(colorWarning)
const colorError = '#D03050'
const colorErrorList = generate(colorError)
const colorInfo = '#2080F0'
const colorInfoList = generate(colorInfo)
const colorNeutral = '#000000'

// TODO 改变variables里的变量值
setCssVar('--primary-color', colorPrimaryList[5])
setCssVar('--success-color', colorSuccessList[5])
setCssVar('--error-color', colorErrorList[5])
setCssVar('--warning-color', colorWarningList[5])

function generateThemeOverrides() {
  return {
    themeOverrides: {
      common: {
        primaryColor: colorPrimaryList[5],
        primaryColorHover: colorPrimaryList[4],
        primaryColorPressed: colorPrimaryList[4],
        primaryColorSuppl: colorPrimaryList[6],

        infoColor: colorInfoList[5],
        infoColorHover: colorInfoList[4],
        infoColorPressed: colorInfoList[4],
        infoColorSuppl: colorInfoList[6],

        successColor: colorSuccessList[5],
        successColorHover: colorSuccessList[4],
        successColorPressed: colorSuccessList[4],
        successColorSuppl: colorSuccessList[6],

        warningColor: colorWarningList[5],
        warningColorHover: colorWarningList[4],
        warningColorPressed: colorWarningList[4],
        warningColorSuppl: colorWarningList[6],

        errorColorColor: colorErrorList[5],
        errorColorHover: colorErrorList[4],
        errorColorPressed: colorErrorList[4],
        errorColorSuppl: colorErrorList[6],

        // text color and so on ...
        textColorBase: colorNeutral,
      },
    },
  }
}

const theme = generateThemeOverrides()
</script>
<template>
  <Config abstract :theme="appTheme" v-bind="theme"> <slot></slot></Config>
</template>

<style scoped></style>
