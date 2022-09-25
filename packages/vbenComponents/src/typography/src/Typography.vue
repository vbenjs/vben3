<script lang="ts" setup name="VbenTypography">
import { maps } from '#/index'
const Typography = maps.get('Typography')
</script>
<template>
  <Typography v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Typography>
</template>

<style scoped></style>
