<script lang="ts" setup>
defineOptions({ name: 'VbenMenu' })
import { maps } from '../../index'
import { ref } from 'vue'
const Menu = maps.get('Menu')
const Ref = ref(null)
defineExpose({ Ref })
const MenuItem = maps.get('MenuItem')
</script>
<template>
  <Menu v-bind="$attrs" ref="Ref">
    <MenuItem v-for="i in $attrs.options" :key="i.key">{{ i.label }}</MenuItem>
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Menu>
</template>

<style scoped></style>
