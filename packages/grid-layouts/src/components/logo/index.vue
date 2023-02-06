<script lang="ts" setup>
import {
  useHeaderSettingStore,
  useMenuSettingStore,
  useSporadicSettingStore,
} from '../../store'
import { storeToRefs } from '@vben/pinia'
import { useComprehensive } from '../../hooks/useComprehensive'
import { computed, unref } from 'vue'
const {
  width,
  collapsed,
  collapsedWidth,
  isSidebar,
  isMixSidebar,
  mixSidebarWidth,
} = storeToRefs(useMenuSettingStore())
const { height } = storeToRefs(useHeaderSettingStore())
const { showLogo } = storeToRefs(useSporadicSettingStore())
const { getShowLogoTitle } = useComprehensive()

const getWidth = computed(() => {
  if (unref(isSidebar) && unref(collapsed)) return unref(collapsedWidth)
  if (unref(isMixSidebar)) return unref(mixSidebarWidth)
  return unref(width)
})

const title = 'Vben Admin'
</script>
<template>
  <div
    v-if="showLogo"
    class="grid grid-cols-2 content-center grid-rows-none pl-8px"
    :style="{
      width: `${getWidth}px`,
      height: `${height}px`,
      transition: 'all 0.3s var(--transition-bezier)',
      'grid-template-columns': `32px ${
        getShowLogoTitle ? 'minmax(0, 1fr)' : 0
      }`,
    }"
  >
    <div class="h-32px w-32px">
      <img class="h-full w-full" src="assets/logo.png" alt="logo" />
    </div>
    <div
      class="p-x-8px truncate grid content-center font-700 text-16px"
      :class="[getShowLogoTitle ? 'visible' : 'invisible']"
    >
      {{ title }}
    </div>
  </div>
</template>
