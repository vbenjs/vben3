<script lang="ts" setup name="VbenDesc">
import { maps } from '#/index'
const Descriptions = maps.get('Descriptions')
</script>
<template>
  <Descriptions v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Descriptions>
</template>

<style scoped></style>
