<script lang="ts" setup>
import { createNamespace } from '@vben/utils'
const { bem } = createNamespace('main')
</script>
<template>
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
