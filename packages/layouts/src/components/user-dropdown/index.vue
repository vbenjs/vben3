<script lang="ts" setup>
import { ref, unref } from 'vue'
import { useI18n } from '@vben/locale'
import LockModal from '../lock/LockModal.vue'
import { renderIcon } from '../../components'
import { context } from '../../../bridge'
const { useUserStore } = context

const userStore = useUserStore()

const { t } = useI18n()

import UserInfo from './user-info.vue'

const options = ref([
  {
    label: t('文档'),
    key: 'doc',
    icon: renderIcon('carbon:document'),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: t('锁定屏幕'),
    key: 'lock',
    icon: renderIcon('ant-design:lock-outlined'),
  },
  {
    label: t('退出系统'),
    key: 'logout',
    icon: renderIcon('ri:shut-down-line'),
  },
])

const showLockModal = ref(false)

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

const handleLock = () => {
  showLockModal.value = !unref(showLockModal)
}
</script>

<template>
  <VbenDropdown trigger="hover" :options="options" @select="handleSelect">
    <UserInfo />
  </VbenDropdown>
  <LockModal v-model:show="showLockModal" />
</template>
