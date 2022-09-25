<script lang="ts" setup name="VbenGrid">
import { maps } from '#/index'
const Grid = maps.get('Grid')
</script>
<template>
  <Grid v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Grid>
</template>

<style scoped></style>
