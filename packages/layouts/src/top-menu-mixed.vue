<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { useComposables } from './useComposables'
import { computed, unref } from 'vue'
import { useAppTheme } from '@vben/hooks'

const { useMenuSetting, useRootSetting, useMultipleTabSetting } = context
const {
  toggleCollapsed,
  getCollapsed,
  getMenuWidth,
  getShowSidebar,
  getShowCenterTrigger,
} = useMenuSetting()
const { getShowFooter } = useRootSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const {
  headerRef,
  tabRef,
  footerRef,
  headerHeight,
  contentStyle,
  mainStyle,
  contentRef,
} = useComposables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)

const { isSidebarDark } = useAppTheme()
</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #menu>
            <LayoutMenu mode="horizontal" />
          </template>
        </LayoutHeader>
      </slot>
    </VbenLayoutHeader>
    <VbenLayout has-sider :style="{ height: menuHeight }">
      <VbenLayoutSider
        v-if="getShowSidebar"
        :show-trigger="getShowCenterTrigger"
        bordered
        :collapsed-width="48"
        :width="getMenuWidth"
        collapse-mode="width"
        :collapsed="getCollapsed"
        @update:collapsed="toggleCollapsed"
        :inverted="!!isSidebarDark"
      >
        <slot name="sider">
          <LayoutMenu split />
        </slot>
      </VbenLayoutSider>

      <VbenLayout>
        <VbenLayoutHeader v-if="getShowMultipleTab">
          <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
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
  </VbenLayout>
</template>
