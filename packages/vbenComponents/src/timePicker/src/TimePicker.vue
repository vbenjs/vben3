<script lang="ts" setup name="VbenTimePicker">
import { maps } from '#/index'
import { computed } from 'vue'
const TimePicker = maps.get('TimePicker')
</script>
<template>
  <TimePicker v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></TimePicker>
</template>

<style scoped></style>
