<script lang="ts" setup>
defineOptions({ name: 'VbenWatermark' })
import { maps } from '../../index'
const Watermark = maps.get('Watermark')
</script>
<template>
  <Watermark v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Watermark>
</template>

<style scoped></style>
