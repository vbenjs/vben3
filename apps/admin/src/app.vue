<script lang="ts" setup>
import { useLocale } from '@vben/locale'
import { useAppTheme, useWebTitle } from '@vben/hooks'

import { REDIRECT_NAME } from '@vben/constants'
import { getGlobalConfig, computedAsync } from '@vben/utils'
import AppProvider from '@/layout/components/app/AppProvider'
import { dateEnUS, dateZhCN, enUS, zhCN, darkTheme } from 'naive-ui'
import { unref, watch, computed } from 'vue'
// Support Multi-language
const { getLocale } = useLocale()
// Listening to page changes and dynamically changing site titles
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== REDIRECT_NAME)
const { isDark, themeColors } = useAppTheme()

//监听是否暗黑模式
watch(
  () => unref(isDark),
  (v) => {
    document.getElementsByTagName('html')[0].className = v ? 'dark' : ''
  },
  { immediate: true },
)

// Dynamic switch component library language
const dateLocale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      return dateZhCN
    },
    en_US: () => {
      return dateEnUS
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})
// Dynamic switch component library language
const locale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      import('dayjs/locale/zh-cn')
      return zhCN
    },
    en_US: () => {
      import('dayjs/locale/en')
      return enUS
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})

const theme = computed(() => {
  return unref(isDark) ? darkTheme : null
})

const themeOverrides = computed(() => {
  return {
    themeOverrides: {
      common: {
        ...unref(themeColors),
      },
    },
  }
})
</script>

<template>
  <VbenConfig
    :locale="locale"
    :date-locale="dateLocale"
    :theme="theme"
    v-bind="themeOverrides"
  >
    <VbenNotificationProvider>
      <VbenMessageProvider>
        <AppProvider>
          <router-view />
        </AppProvider>
      </VbenMessageProvider>
    </VbenNotificationProvider>
  </VbenConfig>
</template>
