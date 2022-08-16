<script lang="ts" setup>
import { Layout } from '@vben/layouts'
import LayoutMenu from './components/menu/index.vue'
</script>

<template>
  <layout>
    <template #aside>
      <layout-menu />
    </template>

    <template #header>
      <div style="background: red; height: 100%">header</div>
    </template>

    <template #main>
      <div style="background: green; height: 100%">main12</div>
    </template>
  </layout>
</template>
