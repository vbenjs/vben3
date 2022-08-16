<script lang="ts" setup>
import Menu from './menu.vue'
import { Scrollbar } from '@components/common'
import { createNamespace } from '@vben/utils'
import Logo from '../logo.vue'

const { bem } = createNamespace('layout-menu')

const items = [
  {
    path: '/a',
    name: 'A',
  },
  {
    path: '/b',
    name: 'b',
    children: [
      {
        path: '/c',
        name: 'c',
      },
    ],
  },
  {
    path: '/b1',
    name: 'b1',
    children: [
      {
        path: '/c1',
        name: 'c1',
      },
    ],
  },
  {
    path: '/b2',
    name: 'b2',
    children: [
      {
        path: '/c2',
        name: 'c2',
      },
    ],
  },
]
</script>

<template>
  <div :class="bem()">
    <logo :class="bem('logo')" />
    <scrollbar :class="bem('scrollbar')">
      <Menu :menus="items" value="/c" />
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
