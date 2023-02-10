<script lang="ts" setup>
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'
const { toggleOpenSettingDrawer, header, settingButtonPosition, content } =
  useAppConfig()

const getShowSettingFixedButton = computed(() => {
  if (!unref(header).showSetting) {
    return false
  }
  if (unref(settingButtonPosition) === SettingButtonPositionEnum.AUTO) {
    return (
      !unref(header).show ||
      !unref(header).showSetting ||
      unref(content).fullScreen
    )
  }
  return unref(settingButtonPosition) === SettingButtonPositionEnum.FIXED
})
</script>
<template>
  <div
    v-if="getShowSettingFixedButton"
    @click.stop="toggleOpenSettingDrawer"
    class="p-6px grid-center z-999 text-white fixed right-0 top-1/2 translate-y--1/2 border-rd-l bg-[rgba(9,96,189,.9)] cursor-pointer"
  >
    <VbenIconify icon="fluent:settings-48-regular" />
  </div>
</template>
