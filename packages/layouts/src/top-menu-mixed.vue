<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import { context } from '../bridge'
import { headerRef, height } from './data'
import { computed } from 'vue'
const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed, getMenuWidth } = useMenuSetting()
const menuHeight = computed(() => window.document.body.clientHeight)
</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </VbenLayoutHeader>
    <VbenLayout has-sider :style="{ height: menuHeight - height + 'px' }">
      <VbenLayoutSider
        show-trigger
        bordered
        :collapsed-width="48"
        :width="getMenuWidth"
        collapse-mode="width"
        :collapsed="getCollapsed"
        @update:collapsed="toggleCollapsed"
      >
        <slot name="sider">
          <LayoutMenu />
        </slot>
      </VbenLayoutSider>
      <VbenLayoutContent id="layout_main">
        <slot name="tabs"><LayoutTabs /></slot>
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
