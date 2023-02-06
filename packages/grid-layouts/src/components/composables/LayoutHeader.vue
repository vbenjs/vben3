<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useHeaderSettingStore, useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import Setting from '../setting/index.vue'
import Breadcrumb from '../breadcrumb/index.vue'
import Logo from '../logo/index.vue'
const menuSettingStore = useMenuSettingStore()
const { showHeaderTrigger } = storeToRefs(menuSettingStore)
const { hidden } = storeToRefs(useHeaderSettingStore())
</script>
<template>
  <header
    class="grid-area-[grid-header] bg-[#666666] grid grid-cols-2 content-center"
    :class="[hidden ? 'invisible' : 'visible']"
  >
    <div class="h-[var(--header-height)] grid-col-start-1 grid-col-end-3 flex">
      <Logo />
      <Trigger v-if="showHeaderTrigger" />
      <Breadcrumb />
    </div>
    <div class="h-[var(--header-height)] grid-col-[min-content]">
      <Setting />
    </div>
  </header>
</template>
