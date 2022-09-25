<script lang="ts" setup name="VbenPagination">
import { maps } from '#/index'
const Pagination = maps.get('Pagination')
</script>
<template>
  <Pagination v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Pagination>
</template>

<style scoped></style>
