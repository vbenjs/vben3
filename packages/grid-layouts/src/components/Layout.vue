<script lang="ts" setup>
import LayoutHeader from './composables/LayoutHeader.vue'
import LayoutSidebar from './composables/LayoutSidebar.vue'
import LayoutContent from './composables/LayoutContent.vue'
import LayoutTab from './composables/LayoutTab.vue'
import Feature from './feature/index.vue'
import { StoreGeneric, storeToRefs } from 'pinia'
import {
  useLayoutHeader,
  useLayoutSidebar,
  useLayoutTab,
  useLayoutContent,
} from '@vben/stores'
import {
  useAppConfig,
  createGridLayoutListen,
  createThemeColorListen,
} from '@vben/hooks'
import { nextTick, ref } from 'vue'
import { MaybeElementRef } from '@vben/utils'

const { headerRef } = storeToRefs(useLayoutHeader() as StoreGeneric)
const { sidebarRef } = storeToRefs(useLayoutSidebar() as StoreGeneric)
const { tabRef } = storeToRefs(useLayoutTab() as StoreGeneric)
const { contentRef } = storeToRefs(useLayoutContent() as StoreGeneric)
const containerRef = ref<MaybeElementRef>(null)

const { navBarMode } = useAppConfig()
nextTick(() => {
  createGridLayoutListen(containerRef)
  createThemeColorListen(containerRef)
})
</script>
<template>
  <section
    ref="containerRef"
    class="grid-layout-container h-full w-full filter-invert-80"
    :class="[`${navBarMode}`]"
  >
    <LayoutHeader ref="headerRef" />
    <LayoutSidebar ref="sidebarRef" />
    <LayoutTab ref="tabRef" />
    <LayoutContent ref="contentRef" />
    <Feature />
  </section>
</template>
<style lang="scss">
.grid-layout-container {
  display: grid;
  grid-template-columns: minmax(0, var(--aside-width)) minmax(375px, 1fr);
  grid-template-rows: var(--header-height) var(--tab-bar-height) 1fr;
  transition: grid-template-columns 0.3s, grid-template-rows 0.3s;
  transition-timing-function: var(--transition-bezier);
  background-color: var(--layout-container-background-color);
  &.sidebar,
  &.mix-sidebar {
    grid-template-areas:
      'grid-sidebar grid-header'
      'grid-sidebar grid-tab-bar'
      'grid-sidebar grid-content';
  }
  &.mix,
  &.top-menu {
    grid-template-areas:
      'grid-header grid-header'
      'grid-sidebar grid-tab-bar'
      'grid-sidebar grid-content';
  }
}
</style>
