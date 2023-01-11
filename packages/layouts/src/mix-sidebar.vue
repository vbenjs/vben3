<script lang="ts" setup>
import {useComosables} from './useComosables'
import LayoutMixMenu from './components/mixSideBar/Menu.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import {computed, unref} from 'vue';
import {SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH} from '@vben/constants'
const { useMenuSetting,useRootSetting } = context
const {headerRef, contentStyle, mainStyle, footerRef} = useComosables()

const { getCollapsed, getMenuWidth, getMixSideFixed } = useMenuSetting()
const { getShowFooter } = useRootSetting();

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
  </VbenLayout>
</template>
