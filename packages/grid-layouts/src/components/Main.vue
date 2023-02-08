<script lang="ts" setup>
import { useLayoutHeader } from '@vben/stores'
import { useAppConfig } from '@vben/hooks'
import { StoreGeneric, storeToRefs } from 'pinia'

const { headerWidth, headerHeight } = storeToRefs(
  useLayoutHeader() as StoreGeneric,
)
const { setAppConfig, sidebar } = useAppConfig()

</script>
<template>
  <main class="vben-grid-layout-main">
    main - {{ type }}

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
