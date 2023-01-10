<script lang="ts" setup>
import LayoutHeader from './components/header.vue'
import LayoutMenu from './components/menu/index.vue'
import LayoutMain from './components/main.vue'
import { useComosables} from './useComosables'
const {headerRef, contentStyle} = useComosables()
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
    <VbenLayoutContent :content-style="contentStyle">
      <LayoutMain>
        <slot name="main"></slot>
      </LayoutMain>
    </VbenLayoutContent>
  </VbenLayout>
</template>
