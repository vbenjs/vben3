<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import { context } from '../bridge'
import { headerRef, height } from './data'
const { useRootSetting, useMenuSetting } = context
const { toggleCollapsed, getCollapsed } = useMenuSetting()
</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </VbenLayoutHeader>
    <VbenLayout has-sider>
      <VbenLayoutSider
        show-trigger
        bordered
        :collapsed-width="48"
        :width="160"
        collapse-mode="width"
        :collapsed="getCollapsed"
        @update:collapsed="toggleCollapsed"
      >
        <slot name="sider">
          <LayoutMenu />
        </slot>
      </VbenLayoutSider>
      <VbenLayoutContent :style="{ marginTop: height + 'px' }" id="layout_main">
        <slot name="tabs"><LayoutTabs /></slot>
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
