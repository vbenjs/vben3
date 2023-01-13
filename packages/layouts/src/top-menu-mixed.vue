<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { useComosables } from './useComosables'
import {computed, unref} from 'vue'
const { useMenuSetting,useRootSetting, useMultipleTabSetting } = context
const { toggleCollapsed, getCollapsed, getMenuWidth } = useMenuSetting()
const { getShowFooter } = useRootSetting();
const { getShowMultipleTab } = useMultipleTabSetting();

const {headerRef, tabRef, footerRef, headerHeight, contentStyle, mainStyle} = useComosables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)

</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </VbenLayoutHeader>
    <VbenLayout has-sider :style="{ height: menuHeight }">
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
        <VbenLayoutHeader v-if="getShowMultipleTab">
          <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
        </VbenLayoutHeader>
        <VbenLayout :content-style="contentStyle">
          <VbenLayoutContent :content-style="mainStyle">
            <LayoutMain>
              <slot name="main"></slot>
            </LayoutMain>
          </VbenLayoutContent>
          <VbenLayoutFooter v-if="getShowFooter" ref="footerRef">
            <slot name="footer">
              <LayoutFooter/>
            </slot>
          </VbenLayoutFooter>
        </VbenLayout>
      </VbenLayout>


<!--      <VbenLayoutContent>
        <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
        <VbenScrollbar :style="contentStyle">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </VbenScrollbar>
      </VbenLayoutContent>-->
    </VbenLayout>
  </VbenLayout>
</template>
