<script lang="ts" setup>
import LayoutFeature from './feature/index.vue'
import { createNamespace } from '@vben/utils'
const { bem } = createNamespace('main')
</script>
<template>
  <LayoutFeature />
  <main :class="bem()">
    <slot></slot>
  </main>
</template>

<style scoped>
.main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
}
</style>
