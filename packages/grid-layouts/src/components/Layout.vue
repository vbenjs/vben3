<script lang="ts" setup>
import LayoutHeader from './composables/LayoutHeader.vue'
import LayoutSidebar from './composables/LayoutSidebar.vue'
import LayoutContent from './composables/LayoutContent.vue'
import LayoutTab from './composables/LayoutTab.vue'
import Feature from './feature/index.vue'
import { storeToRefs } from '@vben/pinia'
import {
  useLayoutHeader,
  useLayoutSidebar,
  useLayoutTab,
  useMenuSettingStore,
  useLayoutContent,
} from '../store'
import { useComprehensive } from '../hooks/useComprehensive'

const { headerRef } = storeToRefs(useLayoutHeader())
const { sidebarRef } = storeToRefs(useLayoutSidebar())
const { tabRef } = storeToRefs(useLayoutTab())
const { contentRef } = storeToRefs(useLayoutContent())
const { getLayoutStyles } = useComprehensive()

const { type } = storeToRefs(useMenuSettingStore())
</script>
<template>
  <section
    class="grid-layout-container h-full w-full"
    :class="[`${type}`]"
    :style="getLayoutStyles"
  >
    <Feature />
    <LayoutHeader ref="headerRef" />
    <LayoutSidebar ref="sidebarRef" />
    <LayoutTab ref="tabRef" />
    <LayoutContent ref="contentRef" />
  </section>
</template>
<style lang="scss">
.grid-layout-container {
  display: grid;
  grid-template-columns: minmax(0, var(--aside-width)) minmax(640px, 1fr);
  grid-template-rows: var(--header-height) var(--tab-height) 1fr;
  grid-gap: 3px;
  transition: grid-template-columns 0.3s, grid-template-rows 0.3s;
  transition-timing-function: var(--transition-bezier);
  &.sidebar,
  &.mix-sidebar {
    grid-template-areas:
      'grid-sidebar grid-header'
      'grid-sidebar grid-tab-nav'
      'grid-sidebar grid-content';
  }
  &.mix,
  &.top-menu {
    grid-template-areas:
      'grid-header grid-header'
      'grid-sidebar grid-tab-nav'
      'grid-sidebar grid-content';
  }
}
</style>
