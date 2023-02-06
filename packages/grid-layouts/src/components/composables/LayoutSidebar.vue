<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
const menuSettingStore = useMenuSettingStore()
const { showFooterTrigger, hidden } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    class="grid-area-[grid-sidebar] relative"
    :class="[
      { 'pb-40px': showFooterTrigger },
      hidden ? 'invisible' : 'visible',
    ]"
  >
    <!--    <div class="vben-grid-layout-sidebar__container"></div>-->
    <div>sidebar</div>
    <div
      class="h-full w-1px content-none absolute top-0 bottom-0 right-0 bg-[var(--layout-border-color)] transition-colors-3000"
    ></div>
    <Trigger />
  </div>
</template>
