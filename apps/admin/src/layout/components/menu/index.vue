<script lang="ts" setup>
import { Scrollbar } from '@components/common'
import { createNamespace } from '@vben/utils'
import Logo from '../logo.vue'
import { computed, ref, h } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@vben/locale'
import { getMenus } from '@/router'
const { bem } = createNamespace('layout-menu')
const activeKey = ref('A')
const collapsed = ref(false)
const { t } = useI18n()

console.log(getMenus())
// 静态路由
const menus = computed(() => getMenus().map((v) => routerToMenu(v)))
// 路由格式化
const routerToMenu = (item: RouteRecordItem) => {
  const { path, name, children, meta, component } = item
  // console.log(component, item)
  // console.log(name)
  const title = t(meta.title)
  // console.log(title)
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
    children: children && children.map((v) => routerToMenu(v)),
    // icon: renderIcon(HomeIcon)
  }
}
</script>

<template>
  <div :class="bem()">
    <logo :class="bem('logo')" />
    <scrollbar :class="bem('scrollbar')">
      <VbenMenu
        :options="menus"
        v-model:value="activeKey"
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
