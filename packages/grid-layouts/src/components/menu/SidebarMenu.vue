<script lang="ts" setup>
import BasicMenu from './components/BasicMenu.vue'
import { MenuModeEnum } from '@vben/constants'
import { useAppConfig } from '@vben/hooks'
import SubMenu from './components/SubMenu.vue'

const { isSidebar, isMix, menu } = useAppConfig()
</script>
<template>
  <VbenScrollbar>
    <BasicMenu
      v-if="isSidebar || (isMix && !menu.split)"
      :mode="MenuModeEnum.VERTICAL"
    />
    <SubMenu v-if="isMix && menu.split" :mode="MenuModeEnum.VERTICAL" />
  </VbenScrollbar>
</template>
