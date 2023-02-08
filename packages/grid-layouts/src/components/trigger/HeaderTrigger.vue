<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { defineStores } from 'pinia'
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'

const menuSettingStore = useMenuSettingStore()
const { collapsed } = storeToRefs(menuSettingStore)
</script>
<template>
  <TopButtonWrapper @click.stop="menuSettingStore.toggleCollapsed()">
    <VbenIconify
      color="var(--trigger-icon-color)"
      size="22"
      :icon="collapsed ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'"
    />
  </TopButtonWrapper>
</template>
