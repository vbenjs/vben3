<script lang="ts" setup>
import {ref, onMounted, unref} from 'vue'
import { createNamespace } from '@vben/utils'
import { VbenIconify } from '@vben/vbencomponents'
import { context } from '../../../bridge'
import { MenuTypeEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import SiderTrigger from "./SiderTrigger.vue"
import {
  useRouter,
} from 'vue-router'
import {Menu} from "@vben/types";

const { Logo, useMenuSetting, getShallowMenus, getChildrenMenus, getCurrentParentPath } = context
const { getCollapsed, getMixSideTrigger, getMenuType } = useMenuSetting()

const { bem } = createNamespace('layout-mix-menu')
// const collapsed = ref(false)
const { t } = useI18n()
const { currentRoute, go } = useRouter()
let menuModules = ref<Menu[]>([]);
const activePath = ref('');
const childrenMenus = ref<Menu[]>([]);
const openMenu = ref(false);

onMounted(async () => {
  menuModules.value = await getShallowMenus();
  console.log(menuModules.value)
});

// Process module menu click
const handleModuleClick = async (path: string, hover = false) => {
  console.log('是发送到发', path)
  const children = await getChildrenMenus(path);
  if (unref(activePath) === path) {
    if (!hover) {
      if (!unref(openMenu)) {
        openMenu.value = true;
      } else {
        closeMenu();
      }
    } else {
      if (!unref(openMenu)) {
        openMenu.value = true;
      }
    }
    if (!unref(openMenu)) {
      setActive();
    }
  } else {
    openMenu.value = true;
    activePath.value = path;
  }

  if (!children || children.length === 0) {
    if (!hover) go(path);
    childrenMenus.value = [];
    closeMenu();
    return;
  }
  childrenMenus.value = children;
}

const getItemEvents = (item) => {
  if (unref(getMixSideTrigger) === 'hover') {
    return {
      onMouseenter: () => handleModuleClick(item.path, true),
      onClick: async () => {
        const children = await getChildrenMenus(item.path);
        if (item.path && (!children || children.length === 0)) go(item.path);
      },
    };
  }
  return {
    onClick: () => handleModuleClick(item.path),
  };
}

// Close menu
function closeMenu() {
  // if (!unref(getIsFixed)) {
    openMenu.value = false;
  // }
}
// Set the currently active menu and submenu
async function setActive(setChildren = false) {
  const path = currentRoute.value?.path;
  if (!path) return;
  activePath.value = await getCurrentParentPath(path);
  // hanldeModuleClick(parentPath);
  // if (unref(getIsMixSidebar)) {
  //   const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath));
  //   const p = activeMenu?.path;
  //   if (p) {
  //     const children = await getChildrenMenus(p);
  //     if (setChildren) {
  //       childrenMenus.value = children;
  //
  //       if (unref(getMixSideFixed)) {
  //         openMenu.value = children.length > 0;
  //       }
  //     }
  //     if (children.length === 0) {
  //       childrenMenus.value = [];
  //     }
  //   }
  // }
}
</script>

<template>
  <div :class="bem()">
    <logo
      :class="bem('logo')"
      v-if="getMenuType === MenuTypeEnum.MIX_SIDEBAR"
      :showTitle="false"
    />
    <VbenScrollbar :class="bem('scrollbar')">
      <ul :class="bem('module')">
        <li
          :class="[
            bem('module__item'),
            {
              [bem('module__item--active')]: item.path === activePath,
            },
          ]"
          v-bind="getItemEvents(item)"
          v-for="item in menuModules"
          :key="item.path"
        >
<!--          <SimpleMenuTag :item="item" collapseParent dot />-->
          <VbenIconify :class="bem('module__icon')" :size="getCollapsed ? 16 : 20" :icon="item.icon || (item.meta && item.meta.icon)" />
          <p v-show="!getCollapsed" :class="bem('module__name')">
            {{ t(item.meta.title) }}
          </p>
        </li>
      </ul>
    </VbenScrollbar>
    <SiderTrigger />
  </div>
</template>

<style lang="less" scoped>
.layout-mix-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
    justify-content: center;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
  &__module{
    position: relative;
    padding: 1px 0 40px 0;
    margin: 0;
    &__item{
      position: relative;
      padding: 12px 0;
      //color: rgb(255 255 255 / 65%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        //color: @white;
      }
      // &:hover,
      &--active {
        font-weight: 700;
        //color: @white;
        //background-color: @sider-dark-darken-bg-color;

        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          //background-color: @primary-color;
          content: '';
        }
      }
    }
    &__icon {
      transition: all 0.2s;
    }

    &__name {
      margin-bottom: 0;
      margin-top: 5px;
      font-size: 12px;
      transition: all 0.2s;
    }
  }
}
</style>
