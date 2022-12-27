<script lang="ts" setup>
import { headerRef, height } from './data'
import LayoutMixMenu from './components/mixSideBar/menu.vue'
import LayoutHeader from './components/header.vue'
import { context } from '../bridge'
import {computed, unref} from 'vue';
import {SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH} from '@vben/constants'
const { useMenuSetting } = context

const { getCollapsed, getMenuWidth } = useMenuSetting()

const getMixSidebarWidth = computed(()=>{
  return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH
})
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      bordered
      :collapsed-width="getMixSidebarWidth"
      :width="getMenuWidth"
      collapse-mode="width"
      :collapsed="true"
    >
      <slot name="sider">
        <LayoutMixMenu :mix-sidebar-width="getMixSidebarWidth" />
      </slot>
    </VbenLayoutSider>
    <VbenLayout>
      <VbenLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </VbenLayoutHeader>
      <VbenLayoutContent :style="{ marginTop: height + 'px' }" id="layout_main">
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
<style lang="scss" scoped></style>
