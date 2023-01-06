<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@vben/locale'

import { useFullscreen } from '@vben/utils'
const { t } = useI18n()
const { toggle, isFullscreen } = useFullscreen()

const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>

<template>
  <VbenPopover :title="getTitle" placement="bottom" :duration="500">
    <template #trigger>
      <span @click="toggle" class="flex items-center">
        <VbenIconify
          icon="ant-design:fullscreen-outlined"
          hoverPointer
          v-if="!isFullscreen"
        />
        <VbenIconify icon="ant-design:fullscreen-exit-outlined" v-else />
      </span>
    </template>
    <span>{{ getTitle }}</span>
  </VbenPopover>
</template>
