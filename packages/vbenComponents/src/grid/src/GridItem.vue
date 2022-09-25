<script lang="ts" setup name="VbenGridItem">
import { maps } from '#/index'
const GridItem = maps.get('GridItem')
</script>
<template>
  <GridItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></GridItem>
</template>

<style scoped></style>
