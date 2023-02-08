<script lang="ts" setup>
import { useHeaderSettingStore, useSporadicSettingStore } from '../../store'
import { computed, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { SettingButtonPositionEnum } from '@vben/constants'
const sporadicSettingStore = useSporadicSettingStore()

const { showSettingButton, settingButtonPosition, fullContent } =
  storeToRefs(sporadicSettingStore)

const { show } = storeToRefs(useHeaderSettingStore())

const getShowSettingFixedButton = computed(() => {
  if (!unref(showSettingButton)) {
    return false
  }
  if (unref(settingButtonPosition) === SettingButtonPositionEnum.AUTO) {
    return !unref(show) || !unref(showSettingButton) || unref(fullContent)
  }
  return unref(settingButtonPosition) === SettingButtonPositionEnum.FIXED
})
</script>
<template>
  <div
    v-if="getShowSettingFixedButton"
    @click.stop="sporadicSettingStore.toggleSettingDrawerVisible()"
    class="p-6px grid-center z-999 text-white fixed right-0 top-1/2 translate-y--1/2 border-rd-l bg-[rgba(9,96,189,.9)] cursor-pointer"
  >
    <VbenIconify icon="fluent:settings-48-regular" />
  </div>
</template>
