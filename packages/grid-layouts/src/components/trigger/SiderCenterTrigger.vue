<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'

const menuSettingStore = useMenuSettingStore()
const { collapsed } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    class="h-24px w-24px cursor-pointer grid-center absolute top-1/2 right-0 z-1 rounded-1/2 translate-1/2 border border-[var(--trigger-border-color)] bg-[var(--trigger-color)] shadow shadow-color-[rgb(0 0 0 / 6%)]"
    @click.stop="menuSettingStore.toggleCollapsed()"
  >
    <VbenIconify
      :class="[collapsed ? '-rotate-180' : 'rotate-0']"
      icon="ph:caret-left-bold"
      color="var(--trigger-icon-color)"
    />
  </div>
</template>
