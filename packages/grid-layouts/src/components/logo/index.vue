<script lang="ts" setup>
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useSporadicSettingStore,
} from '../../store'
import { storeToRefs } from '@vben/pinia'
const { width } = storeToRefs(useMenuSettingStore())
const { height } = storeToRefs(useHeaderSettingStore())
const { showLogo } = storeToRefs(useSporadicSettingStore())

const title = 'Vben Admin'
</script>
<template>
  <div
    v-if="showLogo"
    class="grid grid-cols-2 content-center grid-rows-none"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      'grid-template-columns': '32px minmax(0, 1fr)',
    }"
  >
    <div class="h-32px w-32px">
      <img class="h-full w-full" src="assets/log.png" alt="logo" />
    </div>
    <div class="pr-6px truncate grid content-center">{{ title }}</div>
  </div>
</template>
