<script lang="ts" setup>
import { ref, computed, unref, nextTick, onMounted } from 'vue'
import { renderMenuIcon, renderMenuLabelToRouterLink } from '../renderMenu'
import { useAppConfig } from '@vben/hooks'
import { MenuModeEnum, REDIRECT_NAME } from '@vben/constants'
import { getMenus, listenerRouteChange } from '@vben/router'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { mapTree } from '@vben/utils'
const { menu, sidebar, isMixSidebar, getCollapsedShowTitle } = useAppConfig()

defineProps({
  mode: {
    type: String,
    default: () => MenuModeEnum.VERTICAL,
  },
})

const activeKey = ref(null)
const menuOptions = ref([])
const basicMenuRef = ref(null)
const { currentRoute } = useRouter()

const showOption = () => {
  nextTick(() => {
    if (!basicMenuRef.value) return
    basicMenuRef.value.Ref.showOption()
  })
}

onMounted(async () => {
  const menus = await getMenus()
  menuOptions.value = mapTree(menus, {
    conversion: (menu) => renderMenuLabelToRouterLink(menu),
  })
  showOption()
})

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
  activeKey.value = menu.path
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
    :mode="mode"
    :icon-size="getMenuItemStyles.iconSize"
    :root-indent="12"
    :render-icon="renderMenuIcon"
    :style="getMenuItemStyles.styles"
    ref="basicMenuRef"
  />
</template>
