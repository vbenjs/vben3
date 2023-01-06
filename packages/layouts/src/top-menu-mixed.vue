<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import { context } from '../bridge'
import { useComosables } from './useComosables'
import {computed} from 'vue'
const { useMenuSetting } = context
const { toggleCollapsed, getCollapsed, getMenuWidth } = useMenuSetting()
const menuHeight = computed(() => window.document.body.clientHeight)

const {headerRef, tabRef, headerHeight, contentStyle} = useComosables()

// console.log(contentStyle)

</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </VbenLayoutHeader>
    <VbenLayout has-sider :style="{ height: menuHeight - headerHeight + 'px' }">
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
      <VbenLayoutContent :content-style="contentStyle">
        <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
