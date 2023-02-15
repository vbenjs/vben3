<script lang="ts" setup>
import Logo from '../logo/index.vue'
import { ref, unref, nextTick, onMounted, watch, computed } from 'vue'
import { renderMenuLabel } from './renderMenu'
import { useAppConfig, useGo } from '@vben/hooks'
import { MenuModeEnum, MixSidebarTriggerEnum } from '@vben/constants'
import {
  getChildrenMenus,
  getCurrentParentPath,
  getShallowMenus,
} from '@vben/router'
import { useRouter } from 'vue-router'
import { mapTree, useElementSize, MaybeComputedElementRef } from '@vben/utils'
import SiderFooterTrigger from '../widgets/SiderFooterTrigger.vue'
import SecondaryBorder from '../comm/SecondaryBorder.vue'
const { menu, sidebar } = useAppConfig()

defineProps({
  mode: {
    type: String,
    default: () => MenuModeEnum.VERTICAL,
  },
})

const activeKey = ref(null)
const menuOptions = ref([])
const basicMenuRef = ref(null)
const logoRef = ref<Element>(null)
const { height: lagoHeight } = useElementSize(
  logoRef as MaybeComputedElementRef,
)
const { currentRoute } = useRouter()
const go = useGo()

const showOption = () => {
  nextTick(() => {
    if (!basicMenuRef.value) return
    basicMenuRef.value.Ref.showOption()
  })
}

const getItemEvents = computed(() => {
  return {
    onMouseenter: (item) => {
      if (unref(menu).mixSideTrigger === MixSidebarTriggerEnum.CLICK) return
      handleModuleClick(item.path, true, item.meta.title)
    },
    onClick: async (item) => {
      if (unref(menu).mixSideTrigger === MixSidebarTriggerEnum.HOVER) {
        const children = await getChildrenMenus(item.path)
        if (item.path && (!children || children.length === 0)) go(item.path)
        return
      }
      await handleModuleClick(item.path, false, item.meta.title)
    },
  }
})

onMounted(async () => {
  const menus = await getShallowMenus()
  menuOptions.value = mapTree(menus, {
    conversion: (menu) => renderMenuLabel(menu, unref(getItemEvents)),
  })
  showOption()
})

watch(
  () => unref(currentRoute).path,
  async (path: string) => {
    let parentPath = await getCurrentParentPath(path)
    if (parentPath) {
      activeKey.value = parentPath
    }
  },
  {
    immediate: true,
  },
)

const getMenuItemStyles = computed(() => {
  if (!unref(sidebar).collapsed) {
    return {
      '--n-item-height': `54px`,
    }
  }
  return {}
})

// Process module menu click
const handleModuleClick = async (path: string, hover = false, title = '') => {
  console.log('handleModuleClick', path)
  // const children = await getChildrenMenus(path);
  // childrenTitle.value = t(title);
  // if (unref(activePath) === path) {
  //   if (!hover) {
  //     if (!unref(openMenu)) {
  //       openMenu.value = true;
  //     } else {
  //       closeMenu();
  //     }
  //   } else {
  //     if (!unref(openMenu)) {
  //       openMenu.value = true;
  //     }
  //   }
  //   if (!unref(openMenu)) {
  //     setActive();
  //   }
  // } else {
  //   openMenu.value = true;
  //   activePath.value = path;
  // }
  //
  // if (!children || children.length === 0) {
  //   if (!hover) go(path);
  //   childrenMenus.value = [];
  //   closeMenu();
  //   return;
  // }
  // childrenMenus.value = children;
}
</script>
<template>
  <Logo ref="logoRef" />
  <VbenScrollbar :style="{ height: `calc(100% - ${lagoHeight}px)` }">
    <VbenMenu
      v-model:value="activeKey"
      :dropdown-placement="menu.dropdownPlacement"
      :options="menuOptions"
      :mode="mode"
      :root-indent="12"
      ref="basicMenuRef"
      :style="getMenuItemStyles"
    />
  </VbenScrollbar>
  <SecondaryBorder right class="!bg-[var(--trigger-background-color)]" />
  <SiderFooterTrigger />
  <VbenElement
    tag="div"
    style="
      color: var(--primary-color);
      transition: 0.3s var(--cubic-bezier-ease-in-out);
    "
    class="absolute top-0 lef-[var(--aside-width)] z-666"
  >
    我是个 span 标签
  </VbenElement>
</template>
