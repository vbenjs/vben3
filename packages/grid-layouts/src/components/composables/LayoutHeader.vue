<script lang="ts" setup>
import Breadcrumb from '../breadcrumb/index.vue'
import Logo from '../logo/index.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import FullScreen from '../widgets/FullScreen.vue'
import Search from '../widgets/Search.vue'
import LocalePicker from '../widgets/LocalePicker.vue'
import UserDropdown from '../widgets/UserDropdown.vue'
import Notify from '../notify/index.vue'
import Setting from '../widgets/Setting.vue'
import HeaderTrigger from '../widgets/HeaderTrigger.vue'
import { useAppConfig } from '@vben/hooks'
import { computed, unref } from 'vue'
import { TriggerEnum } from '@vben/constants'
import TopMenu from '../menu/TopMenu.vue'

const { isMixSidebar, isTopMenu, isMix, sidebar, menu, header } = useAppConfig()

const showHeaderTrigger = computed(() => {
  if (
    unref(isTopMenu) ||
    (unref(isMix) && unref(menu.split)) ||
    unref(isMixSidebar)
  )
    return false
  return unref(sidebar).trigger === TriggerEnum.HEADER
})

const showHeaderLogo = computed(() => {
  return unref(isTopMenu) || unref(isMix)
})
</script>
<template>
  <header
    class="grid-area-[grid-header] grid grid-cols-2 content-center overflow-hidden relative bg-[var(--header-background-color)] color-[var(--header-text-color)] transition-colors-300"
    :class="[header.visible ? 'visible' : 'invisible']"
  >
    <VbenConfig :theme-mode="header.theme" :inherit="false" abstract>
      <div
        class="h-[var(--header-height)] grid-col-start-1 grid-col-end-3 flex"
      >
        <Logo v-if="showHeaderLogo" />
        <HeaderTrigger v-if="showHeaderTrigger" />
        <Breadcrumb v-if="!(isTopMenu || (isMix && menu.split))" />
        <TopMenu />
      </div>
      <div class="h-[var(--header-height)] grid-col-[min-content] flex">
        <Search />
        <Notify />
        <FullScreen />
        <LocalePicker />
        <UserDropdown />
        <Setting />
      </div>
      <SecondaryBorder
        bottom
        shadow
        class="!bg-[var(--header-action-hover-bg-color)]"
      />
    </VbenConfig>
  </header>
</template>
