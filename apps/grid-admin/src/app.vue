<script lang="ts" setup>
import { useLocale } from '@vben/locale'
import { useWebTitle } from '@vben/hooks'

import { REDIRECT_NAME } from '@vben/constants'
import { getGlobalConfig, computedAsync } from '@vben/utils'
import AppProvider from '@/layout/components/app/AppProvider'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { useAppStore } from '@/store/modules/app'
// Support Multi-language
const { getLocale } = useLocale()
// Listening to page changes and dynamically changing site titles
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== REDIRECT_NAME)
const appStore = useAppStore()

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
</script>

<template>
  <VbenConfig :locale="locale" :date-locale="dateLocale">
    <VbenNotificationProvider>
      <VbenMessageProvider>
        <AppProvider>
          <router-view />
        </AppProvider>
      </VbenMessageProvider>
    </VbenNotificationProvider>
  </VbenConfig>
</template>
