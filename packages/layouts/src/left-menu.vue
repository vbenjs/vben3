<script lang="ts" setup>
import { onMounted, ref, nextTick, computed, unref } from 'vue'
import { layoutHeader } from './data'
const header = ref(null)
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMenu from './components/menu/index.vue'
import AppSearch from './components/search/AppSearch.vue'
import AppNotify from './components/notify/index.vue'
import AppFullScreen from './components/FullScreen.vue'
import AppSetting from './components/setting/index.vue'
import { context } from '../bridge'
const { useHeaderSetting, useRootSetting } = context
import { SettingButtonPositionEnum } from '@vben/constants'
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
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()

const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

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
      ><slot name="sider"><LayoutMenu /></slot
    ></VbenLayoutSider>
    <VbenLayout>
      <VbenLayoutHeader ref="header">
        <slot name="header"></slot>
        <VbenSpace vertical>
          <VbenSpace justify="space-between">
            <div>
              <slot name="breadcrumb"
                ><LayoutBreadcrumb v-if="getShowContent && getShowBread"
              /></slot>
            </div>
            <div>
              <slot name="buttons">
                <VbenSpace class="p-1" align="center"
                  ><AppSearch v-if="getShowSearch" />
                  <AppNotify v-if="getShowNotice" />
                  <AppFullScreen v-if="getShowFullScreen" />
                  <VbenLocalePicker
                    v-if="getShowLocalePicker"
                    :reload="true"
                    :showText="false"
                  />
                  <AppSetting v-if="getShowSetting" />
                </VbenSpace>
              </slot></div
          ></VbenSpace>
          <div>
            <slot name="tabs">
              <LayoutTabs />
            </slot>
          </div>
        </VbenSpace>
      </VbenLayoutHeader>
      <VbenLayoutContent id="layout_main"
        ><slot name="main"></slot
      ></VbenLayoutContent>
    </VbenLayout>
  </VbenLayout>
</template>
