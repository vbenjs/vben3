<script lang="ts" setup>
import { MenuTypeEnum } from '@vben/constants'
import { computed } from 'vue'
import LeftMenuLayout from './left-menu.vue'
import TopMenuLayout from './top-menu.vue'
import { context } from '../bridge'
const { useMenuSetting, useRootSetting } = context
const { getMenuType } = useMenuSetting()
const layout = computed(() => {
  console.log(getMenuType.value)
  // return LeftMenuLayout
  switch (getMenuType.value) {
    case MenuTypeEnum.SIDEBAR:
      return LeftMenuLayout
    case MenuTypeEnum.TOP_MENU:
      return TopMenuLayout
  }
})
</script>
<template>
  <component :is="layout"></component>
</template>
