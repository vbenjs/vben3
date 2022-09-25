<script lang="ts" setup name="VbenDatePicker">
import { maps } from '#/index'
const DatePicker = maps.get('DatePicker')
</script>
<template>
  <DatePicker v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></DatePicker>
</template>

<style scoped></style>
