<script lang="ts" setup name="VbenInputNumber">
import { maps } from '#/index'
const InputNumber = maps.get('InputNumber')
</script>
<template>
  <InputNumber v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></InputNumber>
</template>

<style scoped></style>
