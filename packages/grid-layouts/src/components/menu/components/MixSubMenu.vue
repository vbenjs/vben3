<script lang="ts" setup>
import { ref, computed, unref, nextTick, watch } from 'vue'
import { renderMenuIcon, renderMenuLabelToRouterLink } from '../renderMenu'
import { useAppConfig } from '@vben/hooks'
import { REDIRECT_NAME } from '@vben/constants'
import {
  getChildrenMenus,
  getCurrentParentPath,
  listenerRouteChange,
} from '@vben/router'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { mapTree } from '@vben/utils'
const { menu, sidebar, isMixSidebar, getCollapsedShowTitle, setAppConfig } =
  useAppConfig()

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

watch(
  () => unref(currentRoute).path,
  async (path: string) => {
    let parentPath = await getCurrentParentPath(path)
    if (parentPath) {
      const children = await getChildrenMenus(parentPath)
      menuOptions.value = mapTree(children, {
        conversion: (menu) => renderMenuLabelToRouterLink(menu),
      })
      showOption()
    }
    setAppConfig({
      sidebar: { visible: !!unref(menuOptions).length && !!parentPath },
    })
  },
  {
    immediate: true,
  },
)

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
    :options="menuOptions"
    :icon-size="getMenuItemStyles.iconSize"
    :root-indent="12"
    :render-icon="renderMenuIcon"
    :style="getMenuItemStyles.styles"
    ref="basicMenuRef"
  />
</template>
