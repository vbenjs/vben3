<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
const menuSettingStore = useMenuSettingStore()
const { showHeaderTrigger } = storeToRefs(menuSettingStore)

</script>
<template>
  <header class="vben-grid-layout-header">
    <Trigger v-if="showHeaderTrigger" />
    header
  </header>
</template>
<style lang="scss" scoped></style>
