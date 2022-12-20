<script lang="ts" setup>
import { MenuTypeEnum } from '@vben/constants'
import {computed, defineComponent} from 'vue'
import LeftMenuLayout from './left-menu.vue'
import TopMenuLayout from './top-menu.vue'
import TopMenuMixLayout from './top-menu-mixed.vue'
import MixSidebar from './mix-sidebar.vue'
import { context } from '../bridge'
const { useMenuSetting, useLockScreen } = context
// Create a lock screen monitor
const lockEvents = useLockScreen();

const { getMenuType } = useMenuSetting()
const layout = computed<ReturnType<typeof defineComponent>>(() => {
  // return LeftMenuLayout
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
