<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import FullScreen from './components/FullScreen.vue'
import AppSearch from './components/appSearch/AppSearch.vue'
import { computed, unref } from 'vue'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { SettingButtonPositionEnum } from '@/constants'
import SettingDrawer from './components/setting/index.vue'
import Notify from './components/notify/index.vue'

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
</script>

<template>
  <layout>
    <template #sider>
      <div class="h-full">
        <LayoutMenu />
      </div>
    </template>

    <template #header>
      <VbenSpace vertical>
        <div class="flex justify-between items-center">
          <div>
            <LayoutBreadcrumb
              v-if="getShowContent && getShowBread"
              :theme="getHeaderTheme"
            />
          </div>
          <div class="flex items-center">
            <AppSearch v-if="getShowSearch" />
            <Notify v-if="getShowNotice" />
            <FullScreen v-if="getShowFullScreen" />
            <VbenLocalePicker
              v-if="getShowLocalePicker"
              :reload="true"
              :showText="false"
            />
            <SettingDrawer v-if="getShowSetting" />
          </div>
        </div>
        <LayoutTabs />
      </VbenSpace>
    </template>
    <template #main>
      <RouterView />
    </template>
  </layout>
</template>
