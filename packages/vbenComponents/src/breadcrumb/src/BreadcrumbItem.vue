<script lang="ts" setup name="VbenBreadcrumbItem">
import { maps } from '#/index'

const BreadcrumbItem = maps.get('BreadcrumbItem')
</script>
<template>
  <BreadcrumbItem v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></BreadcrumbItem>
</template>

<style scoped></style>
