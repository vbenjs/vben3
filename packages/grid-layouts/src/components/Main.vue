<script lang="ts" setup>
import { useMenuSettingStore } from '../store'
import { useLayoutHeader } from '@vben/stores'
import { useAppConfig } from '@vben/hooks'
import { StoreGeneric, storeToRefs } from 'pinia'
import { useComprehensive } from '../hooks/useComprehensive'

const menuSettingStore = useMenuSettingStore()
const { type } = storeToRefs(menuSettingStore)

const { headerWidth, headerHeight } = storeToRefs(
  useLayoutHeader() as StoreGeneric,
)
const { setAppConfig, setSidebar, sidebar } = useAppConfig()

// console.log(sidebar.value.bgColor)

const { getLayoutStyles } = useComprehensive()
</script>
<template>
  <main class="vben-grid-layout-main">
    main - {{ type }}

    <div>layoutStyles： {{ getLayoutStyles }}</div>
    <div>headerWidth: {{ headerWidth }}, headerHeight: {{ headerHeight }}</div>
    ___________________________________________________________________________
    <div>useAppConfig : {{ sidebar }}</div>
    <div
      @click.stop="setAppConfig({ sidebar: { width: 365423463136132121212 } })"
    >
      sidebar change
    </div>
    <!--    <RouterView />-->
  </main>
</template>
<style lang="scss" scoped></style>
