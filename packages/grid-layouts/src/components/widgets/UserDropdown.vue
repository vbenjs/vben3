<script lang="ts" setup>
import UserInfo from './UserInfo.vue'
import { renderIcon } from '../render'
import { useI18n } from '@vben/locale'
import { ref } from 'vue'

const { t } = useI18n()
const options = ref([
  {
    label: t('文档'),
    key: 'doc',
    icon: renderIcon('icon-park-outline:file-doc'),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: t('锁定屏幕'),
    key: 'lock',
    icon: renderIcon('icon-park-outline:locking-web'),
  },
  {
    label: t('退出系统'),
    key: 'logout',
    icon: renderIcon('wpf:shutdown'),
  },
])
const handleSelect = (key) => {
  switch (key) {
    case 'doc':
      openDoc()
      break
    case 'logout':
      handleLoginOut()
      break
    case 'lock':
      handleLock()
      break
  }
}

const openDoc = () => {
  // openWindow(DOC_URL)
}

const handleLoginOut = () => {
  // userStore.logout(true)
}

const handleLock = () => {
  // showLockModal.value = !unref(showLockModal)
}
</script>
<template>
  <VbenDropdown
    show-arrow
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <UserInfo />
  </VbenDropdown>
</template>
<style lang="scss" scoped></style>
