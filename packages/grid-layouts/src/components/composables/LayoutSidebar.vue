<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from 'pinia'
const menuSettingStore = useMenuSettingStore()
import Logo from '../logo/index.vue'
import { useComprehensive } from '../../hooks/useComprehensive'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
const { showFooterTrigger, hidden, showHeaderTrigger, isMixSidebar } =
  storeToRefs(menuSettingStore)
const { getShowSidebarLogo } = useComprehensive()
</script>
<template>
  <div
    class="grid-area-[grid-sidebar] relative"
    :class="[
      { 'pb-40px': showFooterTrigger },
      hidden ? 'invisible overflow-hidden' : 'visible',
    ]"
  >
    <div>
      <Logo v-if="getShowSidebarLogo" />
    </div>
    <SecondaryBorder right />
    <Trigger v-if="!showHeaderTrigger || isMixSidebar" />
  </div>
</template>
