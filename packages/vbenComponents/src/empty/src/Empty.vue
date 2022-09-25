<script lang="ts" setup name="VbenEmpty">
import { maps } from '#/index'
const Empty = maps.get('Empty')
</script>
<template>
  <Empty v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Empty>
</template>

<style scoped></style>
