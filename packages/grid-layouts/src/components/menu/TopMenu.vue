<script lang="ts" setup>
import BasicMenu from './components/BasicMenu.vue'
import { MenuModeEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'
import MixTopMenu from './components/MixTopMenu.vue'

const { isTopMenu, isMix, menu } = useAppConfig()
</script>
<template>
  <VbenScrollbar x-scrollable v-if="isTopMenu || (isMix && menu.split)">
    <div
      class="h-[var(--header-height)] flex items-center"
      :style="{ justifyContent: menu.topMenuAlign }"
    >
      <BasicMenu v-if="isTopMenu" :mode="MenuModeEnum.HORIZONTAL" />
      <MixTopMenu v-else />
    </div>
  </VbenScrollbar>
</template>
