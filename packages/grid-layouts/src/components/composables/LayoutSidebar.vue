<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
const menuSettingStore = useMenuSettingStore()
import Logo from '../logo/index.vue'
import { useComprehensive } from '../../hooks/useComprehensive'
const { showFooterTrigger, hidden, showHeaderTrigger } =
  storeToRefs(menuSettingStore)
const { getShowSidebarLogo } = useComprehensive()
</script>
<template>
  <div
    class="grid-area-[grid-sidebar] relative"
    :class="[
      { 'pb-40px': showFooterTrigger },
      hidden ? 'invisible' : 'visible',
    ]"
  >
    <div>
      <Logo v-if="getShowSidebarLogo" />
    </div>
    <div
      class="h-full w-1px content-none absolute top-0 bottom-0 right-0 bg-[var(--layout-border-color)] transition-colors-3000"
    ></div>
    <Trigger v-if="!showHeaderTrigger" />
  </div>
</template>
