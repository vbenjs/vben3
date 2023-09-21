<script lang="ts" setup>
import { useComposables } from './useComposables'
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'

const { useAppConfig, useMenuSetting } = context
const {
  getShowMenu,
  getCollapsed,
  getShowCenterTrigger,
  getShowFooterTrigger,
} = useMenuSetting()

const { headerRef, contentStyle, mainStyle, footerRef, contentRef } =
  useComposables()

const { toggleCollapse, sidebar, footer } = useAppConfig()
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider
      v-if="getShowMenu"
      :show-trigger="getShowCenterTrigger"
      bordered
      :collapsed-width="sidebar.collapsedWidth"
      :width="sidebar.width"
      collapse-mode="width"
      :collapsed="getCollapsed"
      @update:collapsed="toggleCollapse"
    >
      <slot name="sider">
        <LayoutMenu />
        <div v-if="getShowFooterTrigger">trigger</div>
      </slot>
    </VbenLayoutSider>
    <VbenLayout>
      <VbenLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </VbenLayoutHeader>
      <VbenLayout :content-style="contentStyle">
        <VbenLayoutContent :content-style="mainStyle" ref="contentRef">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </VbenLayoutContent>
        <VbenLayoutFooter v-if="footer.show" ref="footerRef">
          <slot name="footer">
            <LayoutFooter />
          </slot>
        </VbenLayoutFooter>
      </VbenLayout>
    </VbenLayout>
  </VbenLayout>
</template>

<style scoped></style>
