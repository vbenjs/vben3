<script lang="ts" setup>
import { MenuTypeEnum } from '@vben/constants'
import {computed, defineComponent, unref} from 'vue'
import LeftMenuLayout from './left-menu.vue'
import TopMenuLayout from './top-menu.vue'
import TopMenuMixLayout from './top-menu-mixed.vue'
import MixSidebar from './mix-sidebar.vue'
import Mobile from './mobile-menu.vue'
import { context } from '../bridge'
const { useMenuSetting, useLockScreen, useAppInject } = context
// Create a lock screen monitor
const lockEvents = useLockScreen();

const { getIsMobile } = useAppInject()

const { getMenuType } = useMenuSetting()
const layout = computed<ReturnType<typeof defineComponent>>(() => {
  if (unref(getIsMobile)) return Mobile
  switch (getMenuType.value) {
    case MenuTypeEnum.SIDEBAR:
      return LeftMenuLayout
    case MenuTypeEnum.MIX:
      return TopMenuMixLayout
    case MenuTypeEnum.TOP_MENU:
      return TopMenuLayout
    case MenuTypeEnum.MIX_SIDEBAR:
      return MixSidebar
    default:
      return undefined
  }
})
</script>
<template>
  <component :is="layout" v-bind="lockEvents">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </component>
</template>
