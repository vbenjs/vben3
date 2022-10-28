<script lang="ts" setup>
import { h, ref } from 'vue'
import { context } from '../../../bridge'
const { useUserStore } = context
import { useI18n } from '@vben/locale'
import { openWindow } from '@vben/utils'
import { VbenIconify } from '@vben/vbencomponents'

const userStore = useUserStore()

const { t } = useI18n()

import UserInfo from './user-info.vue'
const renderIcon = (props, children?: any) => {
  return () => {
    return h(VbenIconify, props, children)
  }
}

const options = ref([
  {
    label: t('文档'),
    key: 'doc',
    icon: renderIcon({
      icon: 'carbon:document',
    }),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: t('锁定屏幕'),
    key: 'lock',
    icon: renderIcon({
      icon: 'ant-design:lock-outlined',
    }),
  },
  {
    label: t('退出系统'),
    key: 'logout',
    icon: renderIcon({
      icon: 'ri:shut-down-line',
    }),
  },
])

const handleSelect = (key) => {
  switch (key) {
    case 'logout':
      handleLoginOut()
      break
    case 'doc':
      openDoc()
      break
    case 'lock':
      handleLock()
      break
  }
}

const handleLoginOut = () => {
  userStore.logout(true)
}

const openDoc = () => {
  // openWindow(DOC_URL)
}

const handleLock = () => {}
</script>

<template>
  <VbenDropdown trigger="hover" :options="options" @select="handleSelect">
    <UserInfo />
  </VbenDropdown>
</template>
