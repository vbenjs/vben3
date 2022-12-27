<script lang="ts" setup>
import { headerRef, height } from './data'
import LayoutMixMenu from './components/mixSideBar/menu.vue'
import LayoutHeader from './components/header.vue'
import { context } from '../bridge'
import {computed, unref} from 'vue';
import {SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH} from '@vben/constants'
const { useMenuSetting } = context

const { getCollapsed, getMenuWidth, getMixSideFixed } = useMenuSetting()

const getMixSidebarWidth = computed(()=>{
  return unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH
})
const getContainerStyle = computed(()=>{
  return {paddingLeft: (unref(getMixSideFixed) ? unref(getMenuWidth) : 0) + 'px'}
})
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      bordered
      :collapsed-width="getMixSidebarWidth"
      collapse-mode="width"
      :collapsed="true"
    >
      <slot name="sider">
        <LayoutMixMenu :mix-sidebar-width="getMixSidebarWidth" />
      </slot>
    </VbenLayoutSider>
    <VbenLayout :style="getContainerStyle" class="transition-all">
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
