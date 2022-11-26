<script lang="ts" setup>
import { computed, ref } from 'vue'
import LayoutHeader from './components/header.vue'
import LayoutMenu from './components/menu/index.vue'
import { headerRef, height } from './data'
</script>
<template>
  <VbenLayout class="h-full">
    <VbenLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #menu
            ><LayoutMenu mode="horizontal"
          /></template> </LayoutHeader
      ></slot>
    </VbenLayoutHeader>
    <VbenLayoutContent :style="{ marginTop: height + 'px' }" id="layout_main">
      <slot name="main"></slot>
    </VbenLayoutContent>
  </VbenLayout>
</template>
