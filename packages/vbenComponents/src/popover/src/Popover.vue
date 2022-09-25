<script lang="ts" setup name="VbenPopover">
import { maps } from '#/index'
const Popover = maps.get('Popover')
</script>
<template>
  <Popover v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Popover>
</template>

<style scoped></style>
