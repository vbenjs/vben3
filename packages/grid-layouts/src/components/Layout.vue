<script lang="ts" setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import LayoutContent from './LayoutContent.vue'
import LayoutTab from './LayoutTab.vue'
import { storeToRefs } from '@vben/pinia'
import { useMenuSettingStore } from '../store'

const { type } = storeToRefs(useMenuSettingStore())
</script>
<template>
  <section class="vben-grid-layout-container h-full w-full"
           :class="[`layout-${type}`]">
    <LayoutHeader />
    <LayoutSidebar />
    <LayoutTab />
    <LayoutContent />
  </section>
</template>
<style lang="scss" scoped></style>
