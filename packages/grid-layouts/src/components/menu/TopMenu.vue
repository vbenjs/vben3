<script lang="ts" setup>
import BasicMenu from './components/BasicMenu.vue'
import { MenuModeEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'
import SimpleMenu from './components/SimpleMenu.vue'

const { isTopMenu, isMix, menu } = useAppConfig()
</script>
<template>
  <VbenScrollbar x-scrollable v-if="isTopMenu || (isMix && menu.split)">
    <div
      class="h-[var(--header-height)] flex items-center"
      :style="{ justifyContent: menu.topMenuAlign }"
    >
      <BasicMenu v-if="isTopMenu" :mode="MenuModeEnum.HORIZONTAL" />
      <SimpleMenu v-else :mode="MenuModeEnum.HORIZONTAL" />
    </div>
  </VbenScrollbar>
</template>
