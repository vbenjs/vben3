<script lang="ts" setup>
import LayoutFeature from './feature/index.vue'
import { createNamespace } from '@vben/utils'
import { storeToRefs } from "@vben/pinia";
import {useMenuSettingStore} from "../store/modules/menuSetting";
const { bem } = createNamespace('main')
const menuSettingStore =  useMenuSettingStore()
const { bgColor } = storeToRefs(menuSettingStore);
</script>
<template>
  <LayoutFeature />
  <VbenButton @click="menuSettingStore.setBgColor('fgasd')">
    change {{ bgColor }}
  </VbenButton>
  <main :class="bem()">
    <slot></slot>
  </main>
</template>

<style scoped>
.main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
}
</style>
