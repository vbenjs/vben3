<script lang="ts" setup name="VbenList">
import { maps } from '#/index'
const List = maps.get('List')
</script>
<template>
  <List v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></List>
</template>

<style scoped></style>
