<script lang="ts" setup>
import { useComposables } from './useComposables'
import LayoutMixMenu from './components/mixSideBar/Menu.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { computed, unref } from 'vue'
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from '@vben/constants'
import { createNamespace } from '@vben/utils'
import { useAppTheme } from '@vben/hooks'

const { useMenuSetting, useRootSetting } = context
const { headerRef, contentStyle, mainStyle, footerRef, contentRef } =
  useComposables()

const { getCollapsed, getMenuWidth, getIsFixed, getShowSidebar } =
  useMenuSetting()
const { getShowFooter } = useRootSetting()

const getMixSidebarWidth = computed(() => {
  return unref(getCollapsed)
    ? SIDE_BAR_MINI_WIDTH
    : SIDE_BAR_SHOW_TIT_MINI_WIDTH
})
const getContainerStyle = computed(() => {
  return {
    paddingLeft: (unref(getIsFixed) ? unref(getMenuWidth) : 0) + 'px',
  }
})

const { bem } = createNamespace('layout-mix-sidebar')

const { isSidebarDark } = useAppTheme()
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      v-if="getShowSidebar"
      bordered
      :collapsed-width="getMixSidebarWidth"
      collapse-mode="width"
      :collapsed="true"
      :class="bem()"
      :inverted="!!isSidebarDark"
    >
      <slot name="sider">
        <LayoutMixMenu :mix-sidebar-width="getMixSidebarWidth" />
      </slot>
    </VbenLayoutSider>
    <VbenLayout :style="getContainerStyle" class="transition-all">
      <VbenLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </VbenLayoutHeader>
      <VbenLayout :content-style="contentStyle">
        <VbenLayoutContent :content-style="mainStyle" ref="contentRef">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </VbenLayoutContent>
        <VbenLayoutFooter v-if="getShowFooter" ref="footerRef">
          <slot name="footer">
            <LayoutFooter />
          </slot>
        </VbenLayoutFooter>
      </VbenLayout>
    </VbenLayout>
  </VbenLayout>
</template>
<style lang="less" scoped>
.layout-mix-sidebar {
  z-index: var(--mix-sider-z-index);
}
</style>
