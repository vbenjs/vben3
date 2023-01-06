<script lang="ts" setup>
import {useComosables} from './useComosables'
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import { context } from '../bridge'
const { useMenuSetting } = context
const {headerRef, contentStyle} = useComosables()

const { toggleCollapsed, getCollapsed, getMenuWidth } = useMenuSetting()
</script>
<template>
  <VbenLayout has-sider class="h-full">
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
    <VbenLayout>
      <VbenLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </VbenLayoutHeader>
      <VbenLayoutContent :content-style="contentStyle">
        <slot name="main"></slot>
      </VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>

<style scoped></style>
