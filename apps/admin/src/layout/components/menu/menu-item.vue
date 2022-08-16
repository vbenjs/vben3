<script lang="ts" setup>
import MenuItemContent from './menu-item-content.vue'
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <a-menu-item :key="item.path">
    <menu-item-content :item="item" />
  </a-menu-item>
</template>
