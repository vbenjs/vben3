<script lang="ts" setup>
import { Scrollbar } from '@components/common'
import { createNamespace, mapTree } from '@vben/utils'
import Logo from '../logo.vue'
import { ref, h, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@vben/locale'
import { getMenus } from '@/router'
import type { Menu } from '@/types'

const { bem } = createNamespace('layout-menu')
const collapsed = ref(false)
const { t } = useI18n()

const menusRef = ref<Menu[]>([])

// TODO 静态路由 待实现
onMounted(async () => {
  const menus = await getMenus()
  menusRef.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
})

// 路由格式化
const routerToMenu = (item: RouteRecordItem) => {
  const { name, children, meta } = item
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
    // icon: renderIcon(HomeIcon)
  }
}
</script>

<template>
  <div :class="bem()">
    <logo :class="bem('logo')" />
    <scrollbar :class="bem('scrollbar')">
      <VbenMenu
        :options="menusRef"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
      />
    </scrollbar>
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
