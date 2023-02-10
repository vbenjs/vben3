<script lang="ts" setup>
import { useLayoutHeader } from '@vben/stores'
import {useAppConfig, useAppInject} from '@vben/hooks'
import { StoreGeneric, storeToRefs } from 'pinia'

const { headerWidth, headerHeight } = storeToRefs(
  useLayoutHeader() as StoreGeneric,
)
const { sidebar } = useAppConfig()

const { isMobile } = useAppInject()
</script>
<template>
  <main class="vben-grid-layout-main">
    <div>headerWidth: {{ headerWidth }}, headerHeight: {{ headerHeight }}</div>
    ___________________________________________________________________________
    <div>useAppConfig : {{ sidebar }}</div>
    <div>isMobile: {{ isMobile }}</div>

    <VbenButton>
      大丰收的
    </VbenButton>
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
