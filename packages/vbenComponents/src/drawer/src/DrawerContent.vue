<script lang="ts" setup name="VbenDrawer">
import { maps } from '#/index'
const Drawer = maps.get('Drawer')
</script>
<template>
  <Drawer v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Drawer>
</template>

<style scoped></style>
