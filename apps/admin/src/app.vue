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

// Dynamic switch component library language
const locale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      import('dayjs/locale/zh-cn')
      return import('ant-design-vue/es/locale/zh_CN')
    },
    en_US: () => {
      import('dayjs/locale/en')
      return import('ant-design-vue/es/locale/en_US')
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
