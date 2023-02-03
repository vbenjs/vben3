<script lang="ts" setup>
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'

const menuSettingStore = useMenuSettingStore()
const { collapsed } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    class="h-36px w-full absolute bottom-0 cursor-pointer grid-center bg-[#3b3b3b]"
    @click.stop="menuSettingStore.toggleCollapsed()"
  >
    <VbenIconify
      :class="[collapsed ? '-rotate-180' : 'rotate-0']"
      color="rgba(255, 255, 255, .65)"
      hover-color="rgba(255, 255, 255, 1)"
      icon="ph:caret-double-left-bold"
    />
  </div>
</template>
