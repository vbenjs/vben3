<script lang="ts" setup name="VbenDynamicInput">
import { maps } from '#/index'
const DynamicInput = maps.get('DynamicInput')
</script>
<template>
  <DynamicInput v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></DynamicInput>
</template>

<style scoped></style>
