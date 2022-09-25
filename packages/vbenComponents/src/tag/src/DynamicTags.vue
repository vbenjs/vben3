<script lang="ts" setup name="VbenDynamicTags">
import { maps } from '#/index'
const DynamicTags = maps.get('DynamicTags')
</script>
<template>
  <DynamicTags v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot></template
  ></DynamicTags>
</template>

<style scoped></style>
