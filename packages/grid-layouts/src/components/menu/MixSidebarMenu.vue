<script lang="ts" setup>
import Logo from '../logo/index.vue'
import { ref, unref, nextTick, onMounted, computed, watchEffect } from 'vue'
import { renderMenuLabel, renderMenuLabelToRouterLink } from './renderMenu'
import { useAppConfig, useGo, useSiteGeneral } from '@vben/hooks'
import { useThrottleFn } from '@vben/utils'
import { MixSidebarTriggerEnum } from '@vben/constants'
import {
  getChildrenMenus,
  getCurrentParentPath,
  getShallowMenus,
  listenerRouteChange,
} from '@vben/router'
import { RouteLocationNormalized } from 'vue-router'
import {
  mapTree,
  useElementSize,
  MaybeComputedElementRef,
  cloneDeep,
} from '@vben/utils'
import SiderFooterTrigger from '../widgets/SiderFooterTrigger.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
import MenuFixedTrigger from '../widgets/MenuFixedTrigger.vue'
import { Menu } from '@vben/types'
const { menu, sidebar, closeMixSidebarOnChange, setAppConfig } = useAppConfig()
const { title } = useSiteGeneral()

const activeParentPath = ref('')
const parentMenuOptions = ref([])
let menuModules = ref<Menu[]>([])

const activeChildrenKey = ref('')
const childrenMenuOptions = ref([])

const childrenMenuRef = ref(null)
const logoRef = ref<Element>(null)
const openMenu = ref(false)
const { height: lagoHeight } = useElementSize(
  logoRef as MaybeComputedElementRef,
)
const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)
const go = useGo()

const throttleHandleModuleClick = useThrottleFn(handleModuleClick, 50)

watchEffect(async () =>
  setAppConfig({
    menu: { subMenuWidth: unref(openMenu) ? unref(sidebar).width : 0 },
  }),
)

const showOption = () => {
  nextTick(() => {
    if (!childrenMenuRef.value) return
    childrenMenuRef.value.Ref.showOption()
  })
}

const getItemEvents = computed(() => {
  return {
    onMouseenter: (item) => {
      if (unref(menu).mixSideTrigger === MixSidebarTriggerEnum.CLICK) return
      throttleHandleModuleClick(item.path, true)
    },
    onClick: async (item) => {
      if (unref(menu).mixSideTrigger === MixSidebarTriggerEnum.HOVER) {
        const children = await getChildrenMenus(item.path)
        if (item.path && (!children || children.length === 0)) go(item.path)
        return
      }
      await throttleHandleModuleClick(item.path, false)
    },
  }
})

onMounted(async () => {
  const menus = await getShallowMenus()
  menuModules.value = cloneDeep(menus)
  parentMenuOptions.value = mapTree(menus, {
    conversion: (menu) => renderMenuLabel(menu, unref(getItemEvents)),
  })
  const currPath = unref(currentRoute).path
  if (currPath) {
    activeChildrenKey.value = currPath
    let parentPath = await getCurrentParentPath(currPath)
    if (parentPath) {
      activeParentPath.value = parentPath
    }
    showOption()
  }
})

// Process module menu click
async function handleModuleClick(path: string, hover = false) {
  openMenu.value = true
  const children = await getChildrenMenus(path)
  if (unref(activeParentPath) === path) {
    if (!hover) {
      if (!unref(openMenu)) {
        openMenu.value = true
      } else {
        closeMenu()
      }
    } else {
      if (!unref(openMenu)) {
        openMenu.value = true
      }
    }
    if (!unref(openMenu)) {
      await setActive()
    }
  } else {
    openMenu.value = true
    activeParentPath.value = path
  }

  if (!children || children.length === 0) {
    if (!hover) go(path)
    childrenMenuOptions.value = []
    openMenu.value = false
    return
  }
  childrenMenuOptions.value = mapTree(children, {
    conversion: (menu) => renderMenuLabelToRouterLink(menu),
  })
  showOption()
}

listenerRouteChange((route) => {
  currentRoute.value = route
  setActive(true)
  if (unref(closeMixSidebarOnChange)) {
    closeMenu()
  }
})

async function setActive(setChildren = false) {
  const path = currentRoute.value?.path
  if (!path) return
  activeParentPath.value = await getCurrentParentPath(path)
  if (unref(menu).mixSideFixed) {
    const activeMenu = unref(menuModules).find(
      (item) => item.path === unref(activeParentPath),
    )
    const p = activeMenu?.path
    if (p) {
      const children = await getChildrenMenus(p)
      if (setChildren) {
        childrenMenuOptions.value = mapTree(children, {
          conversion: (menu) => renderMenuLabelToRouterLink(menu),
        })

        if (unref(menu).mixSideFixed) {
          openMenu.value = children.length > 0
        }
      }
      if (children.length === 0) {
        childrenMenuOptions.value = []
        openMenu.value = false
      }
    }
  }
  showOption()
}
function closeMenu() {
  if (unref(menu).mixSideFixed) return
  openMenu.value = false
}

const getMenuEvents = computed(() => {
  return !unref(menu).mixSideFixed
    ? {
        onMouseleave: () => {
          setActive(true)
          closeMenu()
        },
      }
    : {}
})
const getMenuItemStyles = computed(() => {
  if (!unref(sidebar).collapsed) {
    return {
      '--n-item-height': `54px`,
    }
  }
  return {}
})

const getMenuWidth = computed(() => {
  if (unref(sidebar).collapsed) return unref(sidebar).collapsedWidth
  return unref(sidebar).mixSidebarWidth
})
</script>
<template>
  <div
    class="relative w-full h-screen transition-all-300"
    :style="{ width: `${getMenuWidth}px` }"
    v-bind="getMenuEvents"
  >
    <Logo ref="logoRef" :style="{ maxWidth: `${getMenuWidth}px` }" />
    <VbenScrollbar :style="{ height: `calc(100% - ${lagoHeight}px)` }">
      <VbenMenu
        v-model:value="activeParentPath"
        :options="parentMenuOptions"
        :root-indent="12"
        :style="getMenuItemStyles"
      />
    </VbenScrollbar>
    <SecondaryBorder right class="!bg-[var(--trigger-background-color)]" />
    <SiderFooterTrigger />
    <div
      v-bind="getMenuEvents"
      class="h-full absolute top-0 transition-all-300 bg-[var(--aside-background-color)] z-666"
      :style="{
        width: `${menu.subMenuWidth}px`,
        left: `${getMenuWidth}px`,
      }"
    >
      <div
        class="truncate flex items-center justify-between relative right-1px bg-[var(--aside-background-color)]"
        :style="{ height: `${lagoHeight}px` }"
      >
        <span class="font-700 text-16px">
          {{ title }}
        </span>
        <MenuFixedTrigger class="hover:bg-inherit" />
        <SecondaryBorder bottom class="!bg-[var(--trigger-background-color)]" />
      </div>
      <VbenScrollbar :style="{ height: `calc(100% - ${lagoHeight}px)` }">
        <VbenMenu
          ref="childrenMenuRef"
          v-model:value="activeChildrenKey"
          :options="childrenMenuOptions"
          :root-indent="12"
        />
      </VbenScrollbar>
    </div>
  </div>
</template>
