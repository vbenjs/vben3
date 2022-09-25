<script lang="ts" setup name="VbenColorPicker">
import { maps } from '#/index'
const ColorPicker = maps.get('ColorPicker')
</script>
<template>
  <ColorPicker v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </ColorPicker>
</template>

<style scoped></style>
