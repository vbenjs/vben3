<script lang="ts" setup name="VbenInputGroupLabel">
import { maps } from '#/index'
const InputGroupLabel = maps.get('InputGroupLabel')
</script>
<template>
  <InputGroupLabel v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></InputGroupLabel>
</template>

<style scoped></style>
