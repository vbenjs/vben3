<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
const menuSettingStore = useMenuSettingStore()
const { showHeaderTrigger, showFooterTrigger } = storeToRefs(menuSettingStore)
</script>
<template>
  <div
    class="vben-grid-layout-sidebar"
    :class="[{ 'pb-40px': showFooterTrigger }]"
  >
    <!--    <div class="vben-grid-layout-sidebar__container"></div>-->
    <div>sidebar</div>
    <div class="vben-grid-layout-sidebar__border"></div>
    <Trigger v-if="!showHeaderTrigger" />
  </div>
</template>
<style lang="scss" scoped></style>
