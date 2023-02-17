<script lang="ts" setup>
import Logo from '../logo/index.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import SiderFooterTrigger from '../widgets/SiderFooterTrigger.vue'
import SiderCenterTrigger from '../widgets/SiderCenterTrigger.vue'
import { useAppConfig, useAppInject } from '@vben/hooks'
import { computed, unref, ref } from 'vue'
import { TriggerEnum } from '@vben/constants'
import { useElementSize, MaybeComputedElementRef } from '@vben/utils'
import SidebarMenu from '../menu/SidebarMenu.vue'
import MixSidebarMenu from '../menu/MixSidebarMenu.vue'

const { isMixSidebar, isTopMenu, sidebar, isSidebar } = useAppConfig()

const { isMobile } = useAppInject()

const logoRef = ref<Element>(null)

const { height: lagoHeight } = useElementSize(
  logoRef as MaybeComputedElementRef,
)

const showFooterTrigger = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).trigger === TriggerEnum.FOOTER
})

const showCenterTrigger = computed(() => {
  if (unref(isMixSidebar) || unref(isTopMenu)) return false
  return unref(sidebar).trigger === TriggerEnum.CENTER
})

const showSidebarLogo = computed(() => {
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
    <VbenConfig :theme-mode="sidebar.theme" :inherit="false" abstract>
      <template v-if="!isMixSidebar">
        <Logo ref="logoRef" v-if="showSidebarLogo" />
        <SidebarMenu :style="{ height: `calc(100% - ${lagoHeight}px)` }" />
        <SiderFooterTrigger v-if="showFooterTrigger" />
        <SiderCenterTrigger v-if="showCenterTrigger && !isMobile" />
        <SecondaryBorder right class="!bg-[var(--trigger-background-color)]" />
      </template>
      <MixSidebarMenu v-else />
    </VbenConfig>
  </div>
</template>
