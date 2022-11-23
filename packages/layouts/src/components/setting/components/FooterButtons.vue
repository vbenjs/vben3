<script lang="ts" setup>
import {context} from "../../../../bridge";
import {useI18n} from '@vben/locale'

const {t} = useI18n();
const {
  useAppStore,
  useMultipleTabStore,
  useUserStore,
} = context
const appStore = useAppStore()
const tabStore = useMultipleTabStore()
const userStore = useUserStore()
const handleClearAndRedo = () => {
  localStorage.clear()
  appStore.resetAllState()
  // permissionStore.resetState()
  tabStore.resetState()
  userStore.resetState()
  location.reload()
}
</script>
<template>
  <VbenSpace vertical>
    <VbenButton type="info" block>
      <template #icon>
        <VbenIconify icon="ant-design:snippets-twotone"/>
      </template>
      {{ t('layout.setting.copyBtn') }}
    </VbenButton>
    <VbenButton type="warning" @click="handleClearAndRedo" block>
      <template #icon>
        <VbenIconify icon="ant-design:reload-outlined"/>
      </template>
      {{ t('common.resetText') }}
    </VbenButton>
    <VbenButton type="error" block>
      <template #icon>
        <VbenIconify icon="ant-design:redo-outlined"/>
      </template>
      {{ t('layout.setting.clearBtn') }}
    </VbenButton>
  </VbenSpace>
</template>
