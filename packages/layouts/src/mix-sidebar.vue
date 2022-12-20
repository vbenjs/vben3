<script lang="ts" setup>
import { headerRef, height } from './data'
import LayoutMixMenu from './components/menu//mix-menu.vue'
import LayoutHeader from './components/header.vue'
import { context } from '../bridge'
const { useMenuSetting } = context

const { toggleCollapsed, getCollapsed, getMenuWidth } = useMenuSetting()
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      bordered
      :collapsed-width="48"
      :width="getMenuWidth"
      collapse-mode="width"
      :collapsed="true"
    >
      <slot name="sider">
        <LayoutMixMenu />
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
