<script lang="ts" setup>
import Trigger from '../trigger/inedx.vue'
import { useHeaderSettingStore, useMenuSettingStore } from '../../store'
import { storeToRefs } from '@vben/pinia'
import Breadcrumb from '../breadcrumb/index.vue'
import Logo from '../logo/index.vue'
import { useComprehensive } from '../../hooks/useComprehensive'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import FullScreen from '../widgets/FullScreen.vue'
import Search from '../widgets/Search.vue'
import Locale from '../widgets/Locale.vue'
import UserDropdown from '../widgets/UserDropdown.vue'
import Notify from '../notify/index.vue'
import Setting from '../widgets/Setting.vue'
const menuSettingStore = useMenuSettingStore()
const { showHeaderTrigger, isMixSidebar } = storeToRefs(menuSettingStore)
const { hidden } = storeToRefs(useHeaderSettingStore())
const { getShowHeaderLogo } = useComprehensive()
</script>
<template>
  <header
    class="grid-area-[grid-header] grid grid-cols-2 content-center overflow-hidden relative"
    :class="[hidden ? 'invisible' : 'visible']"
  >
    <div class="h-[var(--header-height)] grid-col-start-1 grid-col-end-3 flex">
      <Logo v-if="getShowHeaderLogo" />
      <Trigger v-if="showHeaderTrigger && !isMixSidebar" />
      <Breadcrumb />
    </div>
    <div class="h-[var(--header-height)] grid-col-[min-content] flex">
      <Search />
      <Notify />
      <FullScreen />
      <Locale />
      <UserDropdown />
      <Setting />
    </div>
    <SecondaryBorder bottom shadow />
  </header>
</template>
