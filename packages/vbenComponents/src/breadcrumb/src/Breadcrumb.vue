<script lang="ts" setup name="VbenBreadcrumb">
import { maps } from '#/index'

const Breadcrumb = maps.get('Breadcrumb')
</script>
<template>
  <Breadcrumb v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></Breadcrumb>
</template>

<style scoped></style>
