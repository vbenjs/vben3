<script lang="ts" setup>
import LayoutFooter from './LayoutFooter.vue'
import Main from '../Main.vue'
import { useLayoutFooter } from '../../store'
import { storeToRefs } from '@vben/pinia'
const { footerRef } = storeToRefs(useLayoutFooter())
</script>
<template>
  <div class="vben-grid-layout-content">
    <Main />
    <LayoutFooter ref="footerRef" />
  </div>
</template>
<style lang="scss" scoped></style>
