<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import FullScreen from './components/FullScreen.vue'

const { getHeaderTheme, getShowContent, getShowBread, getShowFullScreen } =
  useHeaderSetting()
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
          <div>
            <FullScreen v-if="getShowFullScreen" />
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
