<script lang="ts" setup name="VbenMenu">
import { maps } from '#/index'
const Menu = maps.get('Menu')
</script>
<template>
  <Menu v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Menu>
</template>

<style scoped></style>
