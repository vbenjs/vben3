<script lang="ts" setup>
import { computed, unref } from 'vue'
import logoImg from '@/assets/images/logo.png'
import { useAppConfig } from '@vben/hooks'

const { isMixSidebar, sidebar, isSidebar, logo, header } = useAppConfig()

const getWidth = computed(() => {
  if (unref(isSidebar) && unref(sidebar).collapsed)
    return unref(sidebar).collapsedWidth
  if (unref(isMixSidebar)) return unref(sidebar).mixSidebarWidth
  return unref(sidebar).width
})

const showLogoTitle = computed(() => {
  if (unref(isSidebar)) return !unref(sidebar).collapsed
  if (unref(isMixSidebar)) return false
  return true
})

const getStyles = computed(() => {
  return {
    width: `${unref(getWidth)}px`,
    height: `${unref(header).height}px`,
    transition: 'all 0.3s var(--transition-bezier)',
    'grid-template-columns': `32px ${
      unref(showLogoTitle) ? 'minmax(0, 1fr)' : 0
    }`,
  }
})
const title = 'Vben Admin'
</script>
<template>
  <div
    v-if="logo.show"
    class="grid grid-cols-2 content-center grid-rows-none pl-8px transition-all-300"
    :style="getStyles"
  >
    <div class="h-32px w-32px">
      <img class="h-full w-full" :src="logoImg" alt="logo" />
    </div>
    <div
      class="p-x-8px truncate grid content-center font-700 text-16px"
      :class="[showLogoTitle ? 'visible' : 'invisible']"
    >
      <span class="block truncate">
        {{ title }}
      </span>
    </div>
  </div>
</template>
