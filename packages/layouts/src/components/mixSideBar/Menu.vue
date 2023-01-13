<script lang="ts" setup>
import {ref, onMounted, unref, computed, CSSProperties} from 'vue'
import {createNamespace, getGlobalConfig} from '@vben/utils'
import { VbenIconify } from '@vben/vbencomponents'
import { context } from '../../../bridge'
import { MenuTypeEnum } from '@vben/constants'
import { useI18n } from '@vben/locale'
import SiderTrigger from "./SiderTrigger.vue"
import MixMenu from "../menu/mix-menu.vue";
import {
  RouteLocationNormalized
} from 'vue-router'
import {Menu} from "@vben/types";
import {useGo} from "@vben/hooks";

const { Logo, useMenuSetting, getShallowMenus, getChildrenMenus, getCurrentParentPath, listenerRouteChange } = context
const { getCollapsed, getMixSideTrigger, getMenuType, getIsMixSidebar, getMixSideFixed, setMenuSetting,mixSideHasChildren, getMenuWidth, getCloseMixSidebarOnChange} = useMenuSetting()
const { title } = getGlobalConfig(import.meta.env)

const { bem } = createNamespace('layout-mix-menu')
const { t } = useI18n()
const go = useGo();
const currentRoute = ref<Nullable<RouteLocationNormalized>>(null);
const props = defineProps({
  mixSidebarWidth: {
    type: Number,
    default: 48
  }
})


let menuModules = ref<Menu[]>([]);
const activePath = ref('');
const childrenMenus = ref<Menu[]>([]);
const openMenu = ref(false);
const sideRef = ref<ElRef>(null);
const childrenTitle= ref('');

onMounted(async () => {
  menuModules.value = await getShallowMenus();
  openMenu.value = unref(getMixSideFixed)
});

listenerRouteChange((route) => {
  currentRoute.value = route;
  setActive(true);
  if (unref(getCloseMixSidebarOnChange)) {
    closeMenu();
  }
});

const getIsFixed = computed(() => {
  /* eslint-disable-next-line */
  mixSideHasChildren.value = unref(childrenMenus).length > 0;
  const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren);
  if (isFixed) {
    /* eslint-disable-next-line */
    openMenu.value = true;
  }
  return isFixed;
});


// Process module menu click
const handleModuleClick = async (path: string, hover = false, title = '') => {
  const children = await getChildrenMenus(path);
  childrenTitle.value = t(title);
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

const getMenuStyle = computed((): CSSProperties => {
  return {
    width: unref(openMenu) ? `${unref(getMenuWidth)}px` : 0,
    left: `${props.mixSidebarWidth}px`,
  };
});

const getItemEvents = (item) => {
  if (unref(getMixSideTrigger) === 'hover') {
    return {
      onMouseenter: () => handleModuleClick(item.path, true, item.meta.title),
      onClick: async () => {
        const children = await getChildrenMenus(item.path);
        if (item.path && (!children || children.length === 0)) go(item.path);
      },
    };
  }
  return {
    onClick: () => handleModuleClick(item.path,false, item.meta.title),
  };
}

// Close menu
function closeMenu() {
  if (!unref(getIsFixed)) {
    openMenu.value = false;
  }
}
// Set the currently active menu and submenu
async function setActive(setChildren = false) {
  const path = currentRoute.value?.path;
  if (!path) return;
  activePath.value = await getCurrentParentPath(path);
  if (unref(getIsMixSidebar)) {
    const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath));
    const p = activeMenu?.path;
    if (p) {
      const children = await getChildrenMenus(p);
      if (setChildren) {
        childrenMenus.value = children;

        if (unref(getMixSideFixed)) {
          openMenu.value = children.length > 0;
        }
      }
      if (children.length === 0) {
        childrenMenus.value = [];
      }
    }
  }
}

const getMenuEvents = computed(() => {
  return !unref(getMixSideFixed)
    ? {
      onMouseleave: () => {
        setActive(true);
        closeMenu();
      },
    }
    : {};
});

const handleFixedMenu = ()=> {
  setMenuSetting({
    mixSideFixed: !unref(getIsFixed),
  });
}
</script>

<template>
  <div :class="bem()" v-bind="getMenuEvents">
    <logo
      :class="[bem('logo'), 'shadow']"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
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
          <VbenIconify :class="bem('module__icon')" :size="getCollapsed ? 16 : 20" :icon="item.icon || (item.meta && item.meta.icon)" />
          <p v-show="!getCollapsed" :class="bem('module__name')">
            {{ t(item.meta.title) }}
          </p>
        </li>
      </ul>
    </VbenScrollbar>
    <SiderTrigger />
    <div :class="['shadow', bem('menu-list')]" :style="getMenuStyle" ref="sideRef">
      <div
        v-show="openMenu"
        :class="[
          bem('menu-list__title'),
          'shadow',
          {
            show: openMenu,
          },
        ]"
      >
        <span class="text"> {{ title }}</span>
        <VbenIconify
          :size="16"
          :icon="getMixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click="handleFixedMenu"
          hoverPointer
        />
      </div>
      <VbenH5 v-if="openMenu" :class="bem('menu-list__children-title')">{{ childrenTitle }}</VbenH5>
      <MixMenu :list="childrenMenus" />
    </div>

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
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover,
      &--active {
        font-weight: 700;

        color: #18a058;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #18a058;
          content: '';
        }
      }
    }
    &__icon {
      transition: all 0.3s;
    }

    &__name {
      margin-bottom: 0;
      margin-top: 5px;
      font-size: 12px;
      transition: all 0.3s;
    }
  }
  &__menu-list{
    position: fixed;
    top: 0;
    width: 0px;
    height: calc(100%);
    background-color: var(--n-color);
    transition: all 0.3s;
    &__title {
      display: flex;
      height: 48px;
      font-size: 18px;
      opacity: 0%;
      transition: unset;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 20px;

      &.show {
        min-width: 130px;
        opacity: 100%;
        transition: all 0.5s ease;
      }
      .pushpin{
        margin-right: 8px;
      }
    }
    &__children-title{
      padding: 6px 20px;
      margin: 0;
    }
  }
}
</style>
