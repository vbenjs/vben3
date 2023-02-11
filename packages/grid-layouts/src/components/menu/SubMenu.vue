<script lang="ts" setup>
import { ref } from 'vue'
import { renderMenuIcon } from '../render'
const activeKey = ref<string | null>(null)
const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderMenuIcon('ic:round-menu'),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderMenuIcon('ic:round-menu'),
    disabled: true,
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
    icon: renderMenuIcon('ic:round-menu'),
    disabled: true,
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderMenuIcon('ic:round-menu'),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderMenuIcon('ic:round-menu'),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderMenuIcon('ic:round-menu'),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderMenuIcon('ic:round-menu'),
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
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]
</script>
<template>
  <VbenMenu
    v-model:value="activeKey"
    :root-indent="36"
    :indent="12"
    :options="menuOptions"
  />
</template>
<style lang="scss" scoped></style>
