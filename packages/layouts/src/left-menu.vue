<script lang="ts" setup>
import Aside from './components/aside.vue'
import Header from './components/header.vue'
import Main from './components/main.vue'
import Container from './components/container.vue'
import { onMounted, ref, nextTick, computed } from 'vue'
import { layoutHeader } from './data'
const header = ref(null)
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import { context } from '../bridge'
const { useHeaderSetting } = context
const {
  getHeaderTheme,
  getShowContent,
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
} = useHeaderSetting()
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
      <VbenLayoutHeader ref="header">
        <slot name="header"></slot>
        <VbenSpace vertical>
          <VbenSpace justify="space-between">
            <div v-if="getShowContent && getShowBread">
              <slot name="breadcrumb"><LayoutBreadcrumb /></slot>
            </div>
            <div><slot name="buttons"></slot></div
          ></VbenSpace>
          <div>
            <slot name="tabs"></slot>
          </div>
        </VbenSpace>
      </VbenLayoutHeader>
      <VbenLayoutContent id="layout_main"
        ><slot name="main"></slot
      ></VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
