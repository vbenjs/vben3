<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
const sporadicSettingStore = useSporadicSettingStore()
</script>
<template>
  <div
    @click.stop="sporadicSettingStore.toggleSettingDrawerVisible()"
    class="p-6px grid-center z-999 text-white fixed right-0 top-1/2 translate-y--1/2 border-rd-l bg-[rgba(9,96,189,.9)] cursor-pointer"
  >
    <VbenIconify
      size="20"
      icon="material-symbols:settings-suggest-outline-rounded"
    />
  </div>
</template>
