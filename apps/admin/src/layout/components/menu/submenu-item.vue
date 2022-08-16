<script lang="ts" setup>
import { computed } from 'vue'
import MenuItem from './menu-item.vue'
import MenuItemContent from './menu-item-content.vue'
import SubmenuItem from './submenu-item.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const showMenu = computed(() => !props.item.meta?.hideMenu)

function menuHasChildren(menu) {
  return (
    Reflect.has(menu, 'children') && !!menu.children && menu.children.length > 0
  )
}
</script>

<template>
  <menu-item v-if="!menuHasChildren(item) && showMenu" :item="item" />
  <a-sub-menu v-if="menuHasChildren(item) && showMenu" :key="item.path">
    <template #title>
      <menu-item-content :item="item" />
    </template>

    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <submenu-item :item="childrenItem" />
    </template>
  </a-sub-menu>
</template>
