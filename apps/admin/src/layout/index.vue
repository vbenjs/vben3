<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
import LayoutBreadcrumb from './components/breadcrumb/index.vue'
import LayoutTabs from './components/tabs/index.vue'
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
        <LayoutBreadcrumb />
        <LayoutTabs />
      </VbenSpace>
    </template>

    <template #main>
      <RouterView />
    </template>
  </layout>
</template>
