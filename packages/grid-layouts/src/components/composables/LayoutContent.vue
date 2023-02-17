<script lang="ts" setup>
import LayoutFooter from './LayoutFooter.vue'
import Main from '../Main.vue'
import { useLayoutFooter } from '@vben/stores'
import { StoreGeneric, storeToRefs } from 'pinia'
const { footerRef } = storeToRefs(useLayoutFooter() as StoreGeneric)
</script>
<template>
  <div class="grid-area-[grid-content]">
    <VbenScrollbar
      class="h-[calc(100vh-var(--header-height)-var(--tab-bar-height))]"
    >
      <div class="grid-layout-content grid">
        <Main />
        <LayoutFooter ref="footerRef" />
      </div>
    </VbenScrollbar>
  </div>
</template>
<style lang="scss">
.grid-layout-content {
  grid-template-columns: 100%;
  grid-template-rows: 1fr minmax(0, var(--footer-height));
  transition: grid-template-columns 0.3s, grid-template-rows 0.3s;
  transition-timing-function: var(--transition-bezier);
}
</style>
