<script lang="ts" setup>
import Aside from './components/aside.vue'
import Header from './components/header.vue'
import Main from './components/main.vue'
import Container from './components/container.vue'
import { onMounted, ref, nextTick, computed } from 'vue'
import { layoutHeader } from './data'
const header = ref(null)
// import LayoutBreadcrumb from './components/breadcrumb/index.vue'

onMounted(() => {
  nextTick(() => {
    // 暴露header实例
    layoutHeader.value = header.value
  })
})
</script>
<template>
  <VbenLayout has-sider class="h-full">
    <VbenLayoutSider show-trigger :collapsed-width="40" :width="160"
      ><slot name="sider"> </slot
    ></VbenLayoutSider>
    <VbenLayout>
      <VbenLayoutHeader ref="header"
        ><slot name="header"> </slot
      ></VbenLayoutHeader>
      <VbenLayoutContent id="layout_main"
        ><slot name="main"></slot
      ></VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
