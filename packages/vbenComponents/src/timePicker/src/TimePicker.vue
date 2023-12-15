<script lang="ts" setup>
defineOptions({ name: 'VbenTimePicker' })
import { maps } from '../../index'
const TimePicker = maps.get('TimePicker')
</script>
<template>
  <TimePicker v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></TimePicker>
</template>

<style scoped></style>
