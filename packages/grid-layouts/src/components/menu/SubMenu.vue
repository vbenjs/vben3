<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import { renderIcon, renderMenuIcon } from '../render'
import { useAppConfig } from '@vben/hooks'
const activeKey = ref(null)
const { menu, sidebar, isMixSidebar, getCollapsedShowLabel } = useAppConfig()

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).collapsed
})
const getIconSize = computed(() => {
  if (unref(getCollapsedShowLabel)) return 50
  return 20
})
const getMenuStyle = computed(() => {
  if (unref(getCollapsedShowLabel)) {
    return { '--n-item-height': '54px' }
  }
  return {}
})
const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon('line-md:calendar'),
    topMenu: true,
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon('ic:round-menu'),
    topMenu: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon('line-md:download-loop'),
    topMenu: true,
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people1',
        children: [
          {
            label: '叙事者',
            key: 'narrator1',
            icon: renderIcon('ic:round-menu'),
          },
          {
            label: '羊男',
            key: 'sheep-man1',
            icon: renderIcon('ic:round-menu'),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage1',
        icon: renderIcon('ic:round-menu'),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food1',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: renderIcon('the-past-increases-the-future-recedes1'),
      },
    ],
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon('line-md:moon-alt-to-sunny-outline-loop-transition'),
    topMenu: true,
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon('ic:round-menu'),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon('ic:round-menu'),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon('line-md:moon-alt-to-sunny-outline-loop-transition'),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: renderIcon('the-past-increases-the-future-recedes'),
      },
    ],
  },
]
</script>
<template>
  <VbenMenu
    v-model:value="activeKey"
    :accordion="menu.accordion"
    :collapsed="getMenuCollapsed"
    :collapsed-width="sidebar.collapsedWidth"
    :dropdown-placement="menu.dropdownPlacement"
    :options="menuOptions"
    :render-icon="renderMenuIcon"
    :icon-size="getIconSize"
    :root-indent="12"
    :style="getMenuStyle"
  />
</template>
<style lang="scss" scoped>
.fds {
  position: absolute;
}
</style>
