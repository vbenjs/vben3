<script lang="ts" setup>
import { useLocale } from '@vben/locale'
import { useWebTitle, computedAsync } from '@vben/use'
import { REDIRECT_NAME } from '@vben/constants'
import { getGlobalConfig } from '@vben/utils'
// Support Multi-language
const { getLocale } = useLocale()

// Listening to page changes and dynamically changing site titles
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== REDIRECT_NAME)
import { darkTheme } from 'naive-ui'
// Dynamic switch component library language
const dateLocale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      return import('naive-ui/lib/locales/date/zhCN')
    },
    en_US: () => {
      return import('naive-ui/lib/locales/date/enUS')
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
      return import('naive-ui/lib/locales/common/zhCN')
    },
    en_US: () => {
      import('dayjs/locale/en')
      return import('naive-ui/lib/locales/common/enUS')
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})
</script>

<template>
  <VbenConfig :theme="darkTheme" :locale="locale" :date-locale="dateLocale">
    <VbenNotificationProvider>
      <VbenMessageProvider>
        <router-view />
      </VbenMessageProvider>
    </VbenNotificationProvider>
  </VbenConfig>
</template>
