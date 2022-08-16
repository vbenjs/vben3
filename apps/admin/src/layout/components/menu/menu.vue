<script lang="ts" setup>
import type { MenuMode, MenuTheme } from 'ant-design-vue/es/menu'
import { ref, unref } from 'vue'
import { uniq, findAllParentField } from '@vben/utils'
import SubmenuItem from './submenu-item.vue'
import { createNamespace } from '@vben/utils'

const props = defineProps({
  mode: {
    type: String as PropType<MenuMode>,
    default: 'inline',
  },
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'dark',
  },
  menus: {
    type: Array as PropType<Recordable<any>[]>,
    default: () => [],
    required: true,
  },
  accordion: {
    type: Boolean,
    default: true,
  },
  value: {
    type: String,
    default: '',
  },
})

const collapsed = ref(false)
const selectedKeys = ref<string[]>([props.value].filter(Boolean))
const openKeys = ref<string[]>([])
const preOpenKeys = ref<string[]>([])
const collapsedOpenKeys = ref<string[]>([])

setOpenKeys(props.value)

const { bem } = createNamespace('ant-menu-component')

function setOpenKeys(key: string) {
  if (props.mode === 'horizontal') {
    return
  }
  const menus = props.menus
  if (menus?.length === 0) {
    openKeys.value = []
    preOpenKeys.value = []
    return
  }
  if (!props.accordion) {
    openKeys.value = uniq([
      ...unref(openKeys),
      ...findAllParentField(menus, key, 'path'),
    ])
  } else {
    openKeys.value = findAllParentField(menus, key, 'path')
  }
}

function onOpenChange(keys: string[]) {
  if (props.mode === 'horizontal' || !props.accordion) {
    openKeys.value = keys
  } else {
    const rootSubMenuKeys: string[] = []
    for (const { children, path } of props.menus) {
      if (children && children.length > 0) {
        rootSubMenuKeys.push(path)
      }
    }

    if (!unref(collapsed)) {
      const latestOpenKey = keys.find(
        (key) => unref(openKeys).indexOf(key) === -1,
      )

      if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
        openKeys.value = keys
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : []
      }
    } else {
      collapsedOpenKeys.value = keys
    }
  }
}
</script>

<template>
  <a-menu
    :class="bem()"
    :inline-indent="20"
    :inline-collapsed="collapsed"
    :sub-menu-open-delay="0.2"
    :mode="mode"
    :theme="theme"
    @open-change="onOpenChange"
    :openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in menus" :key="item.path">
      <submenu-item :item="item" />
    </template>
  </a-menu>
</template>
<style lang="less">
.ant-menu-component {
  &.ant-menu {
    background: transparent !important;
  }

  .ant-menu {
    background: var(--aside-submenu-background-color) !important;
  }

  .ant-menu-item {
    height: 44px !important;
    line-height: 44px !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
