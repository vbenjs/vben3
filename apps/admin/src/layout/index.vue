<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
</script>

<template>
  <layout>
    <template #main>
      <RouterView />
    </template>
  </layout>
</template>
