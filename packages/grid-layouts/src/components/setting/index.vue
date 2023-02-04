<script lang="ts" setup>
import { useSporadicSettingStore } from '../../store'
const sporadicSettingStore = useSporadicSettingStore()
</script>
<template>
  <div
    @click.stop="sporadicSettingStore.toggleSettingDrawerVisible()"
    class="h-full p-x-12px grid-center cursor-pointer"
  >
    <VbenIconify
      size="22"
      icon="material-symbols:settings-suggest-outline-rounded"
    />
  </div>
</template>
