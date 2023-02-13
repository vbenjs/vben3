<script lang="ts" setup>
import {ref, computed, unref, nextTick} from 'vue'
import { renderMenuIcon } from '../renderMenu'
import { useAppConfig } from '@vben/hooks'
import {MenuSplitTyeEnum, MenuModeEnum, REDIRECT_NAME} from '@vben/constants'
import {listenerRouteChange} from "@vben/router";
import {RouteLocationNormalizedLoaded, useRouter} from "vue-router";
const { menu, sidebar, isMixSidebar, getCollapsedShowTitle } = useAppConfig()

defineProps({
  splitType: {
    type: Number as MenuSplitTyeEnum,
    default: MenuSplitTyeEnum.NONE,
  },

  isHorizontal: {
    type: Boolean,
    default: false,
  },
  // menu Mode
  menuMode: {
    type: [String] as MenuModeEnum,
    default: MenuModeEnum.VERTICAL,
  },
  menuOptions: {
    type: [Array],
    default: () => [],
  },
})


const activeKey = ref(null)
const basicMenuRef = ref(null)
const { currentRoute } = useRouter()


const showOption = () => {
  nextTick(() => {
    if (!basicMenuRef.value) return
    basicMenuRef.value.Ref.showOption()
  })
}

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route as RouteLocationNormalizedLoaded)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})


async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).collapsed
})

const getMenuItemStyles = computed(() => {
  const styles = {}
  let iconSize = 20
  if (unref(getCollapsedShowTitle)) {
    iconSize = 54
    styles['--n-item-height'] = `${iconSize}px`
  }
  return {
    styles,
    iconSize,
  }
})
</script>
<template>
  <VbenMenu
    v-model:value="activeKey"
    :accordion="menu.accordion"
    :collapsed="getMenuCollapsed"
    :collapsed-width="sidebar.collapsedWidth"
    :dropdown-placement="menu.dropdownPlacement"
    :options="menuOptions"
    :mode="menuMode"
    :icon-size="getMenuItemStyles.iconSize"
    :root-indent="12"
    :render-icon="renderMenuIcon"
    :style="getMenuItemStyles.styles"
    ref="basicMenuRef"
  />
</template>
