<script lang="ts" setup name="VbenTime">
import { maps } from '#/index'
const Time = maps.get('Time')
</script>
<template>
  <Time v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Time>
</template>

<style scoped></style>
