<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import Setting from '../setting/index.vue'
const menuSettingStore = useMenuSettingStore()
const { showHeaderTrigger } = storeToRefs(menuSettingStore)
</script>
<template>
  <header
    class="grid-area-[grid-header] bg-[#666666] grid grid-cols-2 justify-between content-center"
  >
    <div class="h-[var(--header-height)] grid-col-start-1 grid-col-end-3">
      <Trigger v-if="showHeaderTrigger" />
      left
    </div>
    <div class="h-[var(--header-height)] grid-col-[min-content]">
      <Setting />
    </div>
  </header>
</template>
<style lang="scss">
.sd {
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  grid-column: 1 / 2;
  grid-auto-columns: min-content;
}
</style>
