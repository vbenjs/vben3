<script lang="ts" setup>
import { useHeaderSettingStore, useSporadicSettingStore } from '../../store'
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum } from '@vben/constants'
import { storeToRefs } from '@vben/pinia'
const sporadicSettingStore = useSporadicSettingStore()

const { showSettingButton, settingButtonPosition } =
  storeToRefs(sporadicSettingStore)

const { show } = storeToRefs(useHeaderSettingStore())

const getShowSetting = computed(() => {
  if (!unref(showSettingButton)) {
    return false
  }
  if (unref(settingButtonPosition) === SettingButtonPositionEnum.AUTO) {
    return unref(show)
  }
  return unref(settingButtonPosition) === SettingButtonPositionEnum.HEADER
})
</script>
<template>
  <TopButtonWrapper
    v-if="getShowSetting"
    @click.stop="sporadicSettingStore.toggleSettingDrawerVisible()"
  >
    <VbenIconify icon="fluent:settings-48-regular" />
  </TopButtonWrapper>
</template>
