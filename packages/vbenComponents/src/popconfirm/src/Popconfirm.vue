<script lang="ts" setup name="VbenPopconfirm">
import { maps } from '#/index'
const Popconfirm = maps.get('Popconfirm')
</script>
<template>
  <Popconfirm v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Popconfirm>
</template>

<style scoped></style>
