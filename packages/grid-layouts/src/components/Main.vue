<script lang="ts" setup>
import { useLayoutHeader, useMenuSettingStore } from '../store'
import { storeToRefs } from '@vben/pinia'
import { useComprehensive } from '../hooks/useComprehensive'

const menuSettingStore = useMenuSettingStore()
const { type } = storeToRefs(menuSettingStore)

const { headerWidth, headerHeight } = storeToRefs(useLayoutHeader())

const { getLayoutStyles } = useComprehensive()
</script>
<template>
  <main class="vben-grid-layout-main">
    main - {{ type }}

    <div>layoutStyles： {{ getLayoutStyles }}</div>
    <div>headerWidth: {{ headerWidth }}, headerHeight: {{ headerHeight }}</div>
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
