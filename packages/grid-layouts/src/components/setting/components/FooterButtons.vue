<script lang="ts" setup>
import { useI18n } from '@vben/locale'
import { reactive } from 'vue'
import { useClipboard } from '@vben/utils'
import { storeToRefs } from '@vben/pinia'
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useMultiTabsSettingStore,
  useSporadicSettingStore,
  useTransitionSettingStore,
} from '../../../store'

const { t } = useI18n()
const sporadicSettingStore = useSporadicSettingStore()
const menuSettingStore = useMenuSettingStore()
const headerSettingStore = useHeaderSettingStore()
const multiTabsSettingStore = useMultiTabsSettingStore()
const transitionSettingStore = useTransitionSettingStore()

const handleCopy = () => {
  try {
    const { copy, isSupported } = useClipboard()
    if (!isSupported)
      return console.error('Your browser does not support Clipboard API')
    const source = reactive({
      SporadicSetting: storeToRefs(sporadicSettingStore),
      MenuSetting: storeToRefs(menuSettingStore),
      HeaderSetting: storeToRefs(headerSettingStore),
      MultiTabsSetting: storeToRefs(multiTabsSettingStore),
      TransitionSetting: storeToRefs(transitionSettingStore),
    })
    copy(JSON.stringify(source))
  } catch (e) {
    console.error(e)
  }
}

const handleReset = () => {
  sporadicSettingStore.$reset()
  menuSettingStore.$reset()
  headerSettingStore.$reset()
  multiTabsSettingStore.$reset()
  transitionSettingStore.$reset()
}

const handleClearAndRedo = () => {
  localStorage.clear()
  sessionStorage.clear()
  location.reload()
}
</script>
<template>
  <VbenSpace vertical>
    <VbenButton type="info" block @click="handleCopy">
      <template #icon>
        <VbenIconify icon="ant-design:snippets-twotone" />
      </template>
      {{ t('layout.setting.copyBtn') }}
    </VbenButton>
    <VbenButton type="warning" @click="handleReset" block>
      <template #icon>
        <VbenIconify icon="ant-design:reload-outlined" />
      </template>
      {{ t('common.resetText') }}
    </VbenButton>
    <VbenButton type="error" block @click="handleClearAndRedo">
      <template #icon>
        <VbenIconify icon="ant-design:redo-outlined" />
      </template>
      {{ t('layout.setting.clearBtn') }}
    </VbenButton>
  </VbenSpace>
</template>
