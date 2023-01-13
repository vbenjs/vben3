<script lang="ts" setup>
import LayoutHeader from './components/header.vue'
import LayoutMenu from './components/menu/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { useComosables} from './useComosables'
import {context} from "../bridge";
const {headerRef, footerRef, contentStyle, mainStyle} = useComosables()
const { useRootSetting } = context
const { getShowFooter } = useRootSetting();
</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader ref="headerRef">
          <template #menu>
            <LayoutMenu mode="horizontal"/>
          </template>
        </LayoutHeader>
      </slot>
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
</template>
