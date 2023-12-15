<script lang="ts" setup>
defineOptions({ name: 'VbenCollapse' })
import { maps } from '../../index'
const Collapse = maps.get('Collapse')
</script>
<template>
  <Collapse v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Collapse>
</template>

<style scoped></style>
