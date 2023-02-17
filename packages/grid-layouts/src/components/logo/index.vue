<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useAppConfig, useSiteGeneral } from '@vben/hooks'

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: false,
  },
})

const { isMixSidebar, sidebar, isSidebar, logo, header } = useAppConfig()

const getWidth = computed(() => {
  if (unref(isSidebar) && unref(sidebar).collapsed)
    return unref(sidebar).collapsedWidth
  if (unref(isMixSidebar)) return unref(sidebar).mixSidebarWidth
  return unref(sidebar).width
})

const showLogoTitle = computed(() => {
  if (unref(isSidebar)) return !unref(sidebar).collapsed
  if (unref(isMixSidebar)) return props.showTitle
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

const { title, logo: logoUrl } = useSiteGeneral()
</script>
<template>
  <div
    v-if="logo.show"
    class="grid grid-cols-2 content-center justify-center grid-rows-none transition-all-300"
    :class="[showLogoTitle ? 'ml-8px' : '']"
    :style="getStyles"
  >
    <div class="flex-center" :class="[showLogoTitle ? '' : 'w-full']">
      <div class="h-32px w-32px">
        <img class="h-full w-full" :src="logoUrl" alt="logo" />
      </div>
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
