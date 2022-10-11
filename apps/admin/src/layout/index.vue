<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
import LayoutTabs from './components/tabs/index.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'

const { getShowHeader } = useHeaderSetting()
</script>

<template>
  <layout>
    <template #sider>
      <div class="h-full">
        <LayoutMenu />
      </div>
    </template>
    <template #tabs>
      <LayoutTabs />
    </template>
    <template #main>
      <RouterView />
    </template>
  </layout>
</template>
