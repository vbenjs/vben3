<script lang="ts" setup>
import LayoutFooter from "./LayoutFooter.vue";
</script>
<template>
  <div class="vben-grid-layout-content">
    <slot name="main" :class="['vben-grid-layout-main']"></slot>
    <LayoutFooter />
  </div>
</template>
<style lang="scss" scoped></style>
