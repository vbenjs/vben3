<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
const sporadicSettingStore = useSporadicSettingStore()
</script>
<template>
  <div
    @click.stop="sporadicSettingStore.toggleSettingDrawerVisible()"
    class="p-10px grid-center z-999 text-white fixed right-0 top-1/2 translate-y--1/2 border-rd-l bg-[#0960bd] cursor-pointer"
  >
    <VbenIconify
      size="22"
      icon="material-symbols:settings-suggest-outline-rounded"
    />
  </div>
</template>
