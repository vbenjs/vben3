<script lang="ts" setup>
import LayoutHeader from './composables/LayoutHeader.vue'
import LayoutSidebar from './composables/LayoutSidebar.vue'
import LayoutContent from './composables/LayoutContent.vue'
import LayoutTab from './composables/LayoutTab.vue'
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
    class="vben-grid-layout-container h-full w-full"
    :class="[`layout-${type}`]"
    :style="getLayoutStyles"
  >
    <LayoutHeader ref="headerRef" />
    <LayoutSidebar ref="sidebarRef" />
    <LayoutTab ref="tabRef" />
    <LayoutContent ref="contentRef" />
  </section>
</template>
<style lang="scss" scoped></style>
