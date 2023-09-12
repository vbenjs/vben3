<script lang="ts" setup>
import SettingDrawer from './SettingDrawer.vue'
import { ref } from 'vue'
import { useComposables } from '../../../useComposables'

const settingDrawerVisible = ref(false)
const { contentRef } = useComposables()
</script>
<template>
  <VbenAffix
    @click="settingDrawerVisible = true"
    :listen-to="contentRef"
    :trigger-top="240"
    class="z-999 p-10px flex-center text-white border-rd-l bg-[#0960bd] right-0 cursor-pointer"
  >
    <VbenIconify icon="ion:settings-outline" hoverPointer />
  </VbenAffix>
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
<style lang="scss" scoped></style>
