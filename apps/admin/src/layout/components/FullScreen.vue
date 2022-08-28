<template>
  <VbenPopover :title="getTitle" placement="bottom" :duration="500">
    <template #trigger>
      <span @click="toggle">
        <FullscreenOutlined v-if="!isFullscreen" />
        <FullscreenExitOutlined v-else />
      </span>
    </template>
    <span>{{ getTitle }}</span>
  </VbenPopover>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@vben/locale'
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vben/use'
const { t } = useI18n()
const { toggle, isFullscreen } = useFullscreen()

console.log(t('layout.header.tooltipExitFull'), '------')

const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>
