<script lang="ts" setup name="VbenTooltip">
import { maps } from '#/index'
const Popover = maps.get('Tooltip')
</script>
<template>
  <Popover v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Popover>
</template>

<style scoped></style>
