<script lang="ts" setup>
import Logo from '../logo/index.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import SiderFooterTrigger from '../widgets/SiderFooterTrigger.vue'
import SiderCenterTrigger from '../widgets/SiderCenterTrigger.vue'
import { useAppConfig } from '@vben/hooks'
import { computed, unref } from 'vue'
import { TriggerEnum } from '@vben/constants'


const { isMixSidebar, isTopMenu, sidebar, isSidebar } = useAppConfig()

const showFooterTrigger = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).trigger === TriggerEnum.FOOTER
})

const showCenterTrigger = computed(() => {
  if (unref(isMixSidebar) || unref(isTopMenu)) return false
  return unref(sidebar).trigger === TriggerEnum.CENTER
})

const showSidebarLogo = computed(()=>{
  return unref(isSidebar) || unref(isMixSidebar)
})
</script>
<template>
  <div
    class="grid-area-[grid-sidebar] relative bg-[var(--aside-background-color)] transition-colors-300 color-[var(--aside-text-color)]"
    :class="[
      { 'pb-40px': showFooterTrigger },
      sidebar.visible ? 'visible' : 'invisible overflow-hidden',
    ]"
  >
    <div>
      <Logo v-if="showSidebarLogo" />
    </div>
    <SiderFooterTrigger v-if="showFooterTrigger" />
    <SiderCenterTrigger v-if="showCenterTrigger" />
    <SecondaryBorder right />
  </div>
</template>
