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
import { useAppConfig } from '@vben/hooks'
import { computed, unref } from 'vue'

const { headerRef } = storeToRefs(useLayoutHeader() as StoreGeneric)
const { sidebarRef } = storeToRefs(useLayoutSidebar() as StoreGeneric)
const { tabRef } = storeToRefs(useLayoutTab() as StoreGeneric)
const { contentRef } = storeToRefs(useLayoutContent() as StoreGeneric)

const { navBarMode, isTopMenu, isMixSidebar, sidebar, header, footer, tabTar } =
  useAppConfig()

const getLayoutStyles = computed(() => {
  const getAsideWidth = () => {
    if (unref(isTopMenu) || !unref(sidebar).visible) return 0
    if (unref(sidebar).collapsed) return unref(sidebar).collapsedWidth
    if (unref(isMixSidebar)) return unref(sidebar).mixSidebarWidth
    return unref(sidebar).width
  }

  const getHeaderHeight = () => {
    if (!unref(header).visible) return 0
    return unref(header).height
  }

  const getTabBarHeight = () => {
    if (!unref(tabTar).visible) return 0
    return unref(tabTar).height
  }

  const getFooterHeight = () => {
    if (!unref(footer).visible) return 0
    return unref(footer).height
  }

  return {
    '--aside-width': `${getAsideWidth()}px`,
    '--header-height': `${getHeaderHeight()}px`,
    '--tab-bar-height': `${getTabBarHeight()}px`,
    '--footer-height': `${getFooterHeight()}px`,
  }
})
</script>
<template>
  <section
    class="grid-layout-container h-full w-full"
    :class="[`${navBarMode}`]"
    :style="getLayoutStyles"
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
  grid-template-columns: minmax(0, var(--aside-width)) minmax(640px, 1fr);
  grid-template-rows: var(--header-height) var(--tab-bar-height) 1fr;
  transition: grid-template-columns 0.3s, grid-template-rows 0.3s;
  transition-timing-function: var(--transition-bezier);
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
