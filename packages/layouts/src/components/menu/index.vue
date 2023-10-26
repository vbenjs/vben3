<script lang="ts" setup>
import { ref, h, onMounted, unref, nextTick, computed } from 'vue'
import { createNamespace, mapTree } from '@vben/utils'
import {
  RouteLocationNormalizedLoaded,
  RouterLink,
  useRouter,
} from 'vue-router'
import { useI18n } from '@vben/locale'
import { REDIRECT_NAME } from '@vben/constants'
import { renderIcon } from '../index'
import { context } from '../../../bridge'
import type { RouteMeta } from 'vue-router'

const { Logo, useAppInject, useAppConfig, useMenuSetting } = context
import { getMenus, listenerRouteChange } from '@vben/router'

const { getIsMobile } = useAppInject()

const { menu, isMixSidebar, getCollapsedShowTitle, sidebar, isSidebar } =
  useAppConfig()
const { getTopMenuAlign, getShowFooterTrigger, toggleCollapsed, getCollapsed } =
  useMenuSetting()
const showSidebarLogo = computed(() => {
  return unref(isSidebar) || unref(isMixSidebar)
})
const props = defineProps({
  mode: {
    type: String,
    default: () => 'vertical',
  },
})
const { bem } = createNamespace('layout-menu')
const { t } = useI18n()
const { currentRoute } = useRouter()

const menuRef = ref(null)
const menuList = ref([])
const activeKey = ref()

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).collapsed
})

// 定位菜单选择 与 当前路由匹配
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value.Ref.showOption()
  })
}
// TODO 静态路由 待实现
onMounted(async () => {
  const menus = await getMenus()
  menuList.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
  showOption()
})

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

// 路由格式化
const routerToMenu = (item: RouteRecordItem & RouteMeta) => {
  const { name, children, meta, icon } = item
  const title = t(meta.title as string)
  return {
    label: () => {
      if (children) {
        return title
      }
      return h(
        RouterLink,
        {
          to: {
            name,
          },
        },
        { default: () => title },
      )
    },
    key: name,
    icon: renderIcon(icon),
  }
}
</script>

<template>
  <div :class="bem()">
    <logo
      :class="bem('logo')"
      v-if="showSidebarLogo || getIsMobile"
      :showTitle="getCollapsedShowTitle"
    />

    <VbenScrollbar :class="bem('scrollbar')">
      <VbenMenu
        class="w-full"
        :style="{
          justifyContent:
            getTopMenuAlign === 'center' ? 'center' : `flex-${getTopMenuAlign}`,
        }"
        v-model:value="activeKey"
        :options="menuList"
        :collapsed="getMenuCollapsed"
        :collapsed-width="48"
        :collapsed-icon-size="22"
        :indent="18"
        :root-indent="18"
        ref="menuRef"
        :mode="props.mode"
        :accordion="menu.accordion"
      />
    </VbenScrollbar>
    <div v-if="getShowFooterTrigger">
      <div
        class="bg-gray-500 h-6 flex justify-center items-center"
        @click="toggleCollapsed"
      >
        <svg
          focusable="false"
          :class="getCollapsed ? 'rotate-180' : ''"
          data-icon="double-left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<style>
div:has(> div[class='layout-menu']) {
  flex: 1;
}
</style>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
