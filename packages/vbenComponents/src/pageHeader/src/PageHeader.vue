<script lang="ts" setup>
defineOptions({ name: 'VbenPageHeader' })
import { maps } from '../../index'
const PageHeader = maps.get('PageHeader')
</script>
<template>
  <PageHeader v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="data || {}"></slot> </template
  ></PageHeader>
</template>

<style scoped></style>
