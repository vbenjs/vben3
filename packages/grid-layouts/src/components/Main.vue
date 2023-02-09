<script lang="ts" setup>
import { useLayoutHeader } from '@vben/stores'
import { useAppConfig } from '@vben/hooks'
import { StoreGeneric, storeToRefs } from 'pinia'

const { headerWidth, headerHeight } = storeToRefs(
  useLayoutHeader() as StoreGeneric,
)
const { sidebar } = useAppConfig()

</script>
<template>
  <main class="vben-grid-layout-main">
    <div>headerWidth: {{ headerWidth }}, headerHeight: {{ headerHeight }}</div>
    ___________________________________________________________________________
    <div>useAppConfig : {{ sidebar }}</div>
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
