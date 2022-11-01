<script lang="ts" setup>
import { createNamespace, mapTree } from '@vben/utils'
import { VbenIconify } from '@vben/vbencomponents'
import { context } from '../../../bridge'
const { Logo, getMenus, listenerRouteChange, useMenuSetting } = context
import { ref, h, onMounted, unref } from 'vue'
import {
  RouteLocationNormalizedLoaded,
  RouterLink,
  useRouter,
} from 'vue-router'
import { useI18n } from '@vben/locale'
import { REDIRECT_NAME } from '@vben/constants'

const { bem } = createNamespace('layout-menu')
// const collapsed = ref(false)
const { t } = useI18n()
const { currentRoute } = useRouter()
const { getCollapsed } = useMenuSetting()

const menusRef = ref([])
const activeKey = ref()

// TODO 静态路由 待实现
onMounted(async () => {
  const menus = await getMenus()
  menusRef.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
})

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)

  activeKey.value = menu.name
}

// 路由格式化
const routerToMenu = (item: RouteRecordItem) => {
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
function renderIcon(icon: string) {
  return () => h(VbenIconify, { icon })
}
</script>

<template>
  <div :class="bem()">
    <logo :class="bem('logo')" />
    <VbenScrollbar :class="bem('scrollbar')">
      <VbenMenu
        v-model:value="activeKey"
        :options="menusRef"
        :collapsed="getCollapsed"
        :collapsed-width="48"
        :collapsed-icon-size="22"
        :indent="18"
        :root-indent="18"
      />
    </VbenScrollbar>
  </div>
</template>

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