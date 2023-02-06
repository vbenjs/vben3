<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'

const menuSettingStore = useMenuSettingStore()
const { collapsed } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    class="h-full p-x-12px grid-center cursor-pointer"
    @click.stop="menuSettingStore.toggleCollapsed()"
  >
    <VbenIconify
      color="var(--trigger-icon-color)"
      size="22"
      :icon="collapsed ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'"
    />
  </div>
</template>
