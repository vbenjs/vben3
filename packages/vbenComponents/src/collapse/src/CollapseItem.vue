<script lang="ts" setup>
defineOptions({ name: 'VbenCollapseItem' })
import { maps } from '../../index'
const CollapseItem = maps.get('CollapseItem')
</script>
<template>
  <CollapseItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></CollapseItem>
</template>

<style scoped></style>
